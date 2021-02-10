import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { NewPageRoutingModule } from './new-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NewPage } from './new.component';
import { NewItemComponent } from './components/icon/new-item.component';
import { NewService } from './new.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    NewPage,
    NewItemComponent
  ],
  providers: [
    NewService,
    DatePipe
  ]
})
export class NewPageModule {}
