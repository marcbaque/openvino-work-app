import { Injectable } from '@angular/core';
import Web3 from "web3";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;

  constructor() {
      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.providerUrl));
  }

  public async signMessage(message: string, privateKey: string) {
    return await this.web3.eth.accounts.sign(message, privateKey).signature
  }
}
