import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftListPageRoutingModule } from './gift-list-routing.module';

import { GiftListPage } from './gift-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftListPageRoutingModule
  ],
  declarations: [GiftListPage]
})
export class GiftListPageModule {}
