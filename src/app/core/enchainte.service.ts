import { Injectable } from "@angular/core";
import { BloockClient, Proof, Record } from "@bloock/sdk";
import { defer, from, Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EnchainteService {
  private sdk: BloockClient;

  constructor(public http: HttpClient) {
    this.sdk = new BloockClient(environment.apiKey);
  }

  public write(data: any): Observable<string> {
    return defer(async () => {
      let message = Record.fromObject(data);
      await this.sdk.sendRecords([message]);
      return message.getHash();
    });
  }

  public async verify(proof: Proof) {
    return (await this.sdk.verifyProof(proof)) > 0;
  }
}
