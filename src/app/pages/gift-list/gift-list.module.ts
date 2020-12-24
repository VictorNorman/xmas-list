import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GiftListPageRoutingModule } from './gift-list-routing.module';
import { GiftListPage } from './gift-list.page';
import { UserImageModule } from 'src/app/user-image/user-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftListPageRoutingModule,
    UserImageModule,
  ],
  declarations: [GiftListPage]
})
export class GiftListPageModule { }
