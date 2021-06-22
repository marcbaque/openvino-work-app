import { Injectable } from '@angular/core';
import { EnchainteClient, Message } from '@enchainte/sdk';
import { defer, from, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proof } from '@enchainte/sdk/dist/types/proof/entity/proof.entity';

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
      await this.sdk.sendMessages([message])
      return message.getHash()
    })
  }

  

  public verify(proof: Proof) {
    return this.sdk.verifyProof(proof)
  }
}
