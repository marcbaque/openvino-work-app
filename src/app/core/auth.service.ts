import { Injectable } from '@angular/core';
import * as BIP39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import * as Wallet from 'ethereumjs-wallet';
import { keccak256 } from 'js-sha3';
import { environment } from 'src/environments/environment';
import { defer, Observable } from 'rxjs';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public saveMnemonic(mnemonic: string) {
    localStorage.setItem('mnemonic', mnemonic);
  }

  public isAuthenticated(): boolean {
    let mnemonic = localStorage.getItem('mnemonic');
    return !!mnemonic
  }

  public createAccount(): string {
    let mnemonic = BIP39.generateMnemonic();
    return mnemonic
  }

  public getAccount() {
    let mnemonic = localStorage.getItem('mnemonic');
    let seed = BIP39.mnemonicToSeedSync(mnemonic);
    let privKey = hdkey.fromMasterSeed(seed).derivePath(`m/44'/60'/0'/0`).getWallet().getPrivateKey();
    console.log(privKey.toString('hex'))
    const pubKey = Wallet.default.fromPrivateKey(privKey).getPublicKey();
    const address = keccak256(pubKey)
    return "0x" + address.substring(address.length - 40, address.length)
  }

  public validateMnemonic(mnemonic: string): boolean {
    return BIP39.validateMnemonic(mnemonic)
  }

  public resolveAddress(address: string): Observable<string> {
    return defer(async () => {
      var provider = new ethers.providers.JsonRpcProvider(environment.providerUrl);
      var name = await provider.lookupAddress(address);
      return name;
    })
  }
}
