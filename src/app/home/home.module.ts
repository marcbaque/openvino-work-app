import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonBottomSheetModule } from 'ion-bottom-sheet';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { WorkItemComponent } from './components/work-item/work-item.component';
import { HomeService } from './home.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule.forChild(),
    IonBottomSheetModule
  ],
  declarations: [
    HomePage,
    WorkItemComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomePageModule {}
