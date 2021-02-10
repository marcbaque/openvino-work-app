import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { CoreModule } from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    Clipboard
  ]
})
export class LoginModule {}
