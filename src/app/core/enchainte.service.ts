import { Injectable } from '@angular/core';
import { EnchainteClient, Message } from '@enchainte/sdk';
import { defer, from, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Proof from '@enchainte/sdk/dist/types/entity/proof';

@Injectable({
  providedIn: 'root'
})
export class EnchainteService {

  private sdk: EnchainteClient;

  constructor(
    public http: HttpClient
  ) {
    this.sdk = new EnchainteClient(environment.apiKey);
  }

  public write(data: any): Observable<string> {
    return defer(async () => {
      let message = Message.from(data);
      await this.sdk.sendMessage(message)
      return message.getHash()
    })
  }

  public getProof(hash: Message[], date: Date, day = false) {
    if (hash && hash.length > 0) {
      let firstHash = hash[0]
      return from(this.sdk.getProof(hash))
        .pipe(
          flatMap(res => {
            return from(this.sdk.getMessages([firstHash]))
              .pipe(
                map(messages => {
                  if (messages && messages[0]) {
                    return {
                      proof: res,
                      root: messages[0].root,
                      txHash: messages[0].txHash
                    }
                  }
                })
              )
          })
        );
    } else {
      let dateQuery = day ? `&day=${date.getDate()}` : ''
      return this.http.get(`${environment.apiUrl}/sensor_data/hashes?year=${date.getFullYear()}&month=${date.getMonth() + 1}${dateQuery}`)
        .pipe(
          map((hashes: any[]) => {
            return hashes.map(hash => {
              return Message.fromHash(hash)
            })
          }),
          flatMap(hashes => {
            return this.getProof(hashes, date)
          })
        )
    }
  }

  public verify(proof: Proof) {
    return this.sdk.verifyProof(proof)
  }
}
