import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SheetState } from 'ion-bottom-sheet'
import { AuthService } from '../core/auth.service';
import { HomeService } from './home.service';
import { WorkModel } from './work.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public account: string;
  public domain: string;

  public profileState = SheetState.Bottom;
  public workList: WorkModel[] = [];

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    private homeService: HomeService
  ) {
    this.account = this.authService.getAccount();

    this.authService.resolveAddress(this.account)
      .subscribe(res => {
        this.domain = res;
      })
    this.homeService.getTasks()
      .subscribe(res => {
        this.workList = res;
      })
  }

  newItem() {
    this.navCtrl.navigateForward('new')
  }

  openProfile() {
    this.profileState = SheetState.Docked;
  }

  copyPublicKey() {
    let aux = document.createElement('input');
    aux.setAttribute('value', this.account);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
  }


}
