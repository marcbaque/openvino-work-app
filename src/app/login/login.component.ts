import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public creating = false;
  public importing = false;
  public mnemonic: string;

  constructor(
    private navController: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  createAccount() {
    this.creating = true;
    this.mnemonic = this.authService.createAccount();
  }

  importAccount() {
    this.importing = true;
  }

  onNext() {
    if (this.authService.validateMnemonic(this.mnemonic)) {
      this.authService.saveMnemonic(this.mnemonic);

      this.navController.navigateRoot('home');
    }
  }

  reset() {
    this.creating = false;
    this.importing = false;
    this.mnemonic = null;
  }

  copyMnemonic() {
    let aux = document.createElement('input');
    aux.setAttribute('value', this.mnemonic);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
  }

  validateMnemonic(): boolean {
    return this.authService.validateMnemonic(this.mnemonic)
  }
}
