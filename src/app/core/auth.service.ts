import { Injectable } from '@angular/core';
import * as BIP39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import * as Wallet from 'ethereumjs-wallet';
import { keccak256 } from 'js-sha3';
import { environment } from 'src/environments/environment';
import { defer, from, Observable, of } from 'rxjs';
import { ethers } from 'ethers';
import { flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private web3Service: Web3Service
  ) { }

  public saveMnemonic(mnemonic: string) {
    localStorage.setItem('openvino.mnemonic', mnemonic);
  }

  public isAuthenticated(): boolean {
    let account = this.getAccount();
    if (!account) {
      return false
    }

    let expire = parseInt(localStorage.getItem('openvino.expire'));
    let token = localStorage.getItem('openvino.token');
    if (token && expire && new Date().getTime() < expire) {
      return true;
    }
    else return false;
  }

  public createAccount(): string {
    let mnemonic = BIP39.generateMnemonic();
    return mnemonic
  }

  public getPrivateKey() {
    let mnemonic = localStorage.getItem('openvino.mnemonic');
    let seed = BIP39.mnemonicToSeedSync(mnemonic);
    let privKey = hdkey.fromMasterSeed(seed).derivePath(`m/44'/60'/0'/0`).getWallet().getPrivateKey();
    return privKey.toString('hex')
  }

  public getAccount() {
    let mnemonic = localStorage.getItem('openvino.mnemonic');
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
      console.log(name)
      return name;
    })
  }

  public authenticate(): Observable<string> {
    let authenticated = this.isAuthenticated();
    
    if (authenticated) {
      let token = localStorage.getItem('openvino.token');
      return of(token)
    } else {
      let userAccount = this.getAccount()
      return this.http.get(`${environment.apiUrl}/auth?public_key=${userAccount}`).pipe(
        map((res: any) => {
          localStorage.setItem('openvino.expire', res.expire);
          localStorage.setItem('openvino.role', res.role);
          localStorage.setItem('openvino.integrity', res.integrity);
          localStorage.setItem('openvino.address', res.address);
          return res;
        }),
        flatMap(res => {
          let message = `${res.address}$${res.expire}$${res.integrity}$${res.role}`
          return this.signMessage(message, this.getPrivateKey())
        }),
        map(signature => {
          localStorage.setItem('openvino.token', signature);
          return signature;
        })
      )
    }
  }

  public getRole(): 'Manager' | 'Minter' | 'Guest' {
    let role = localStorage.getItem('openvino.role');
    if (role) {
      switch (role) {
        case 'Manager':
        case 'Minter':
        case 'Guest':
          return role;
      }
    }

    return 'Guest';
  }

  private signMessage(message: string, account: string): Observable<string> {
    return from(this.web3Service.signMessage(message, account)).pipe(
        map(signature => {
            signature = signature.substring(2)
            let validation = new Uint8Array([
                signature.charCodeAt(signature.length - 2) - 49,
                signature.charCodeAt(signature.length - 1) - 98
            ])

            return signature.substring(0, signature.length - 2) + validation[0].toString(16) + validation[1].toString(16)
        })
    );
}


  // private signMessage(message: string, privateKey: string): Observable<string> {
  //   let wallet = new ethers.Wallet(privateKey)

  //   return from(wallet.signMessage(message)).pipe(
  //     map(signature => {
  //       signature = signature.substring(2)
  //       let validation = new Uint8Array([
  //         signature.charCodeAt(signature.length - 2) - 49,
  //         signature.charCodeAt(signature.length - 1) - 98
  //       ])

  //       return signature.substring(0, signature.length - 2) + validation[0].toString(16) + validation[1].toString(16)
  //     })
  //   );
  // }

}
