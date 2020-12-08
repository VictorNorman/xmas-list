import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGiftPageRoutingModule } from './add-gift-routing.module';

import { AddGiftPage } from './add-gift.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGiftPageRoutingModule
  ],
  declarations: [AddGiftPage]
})
export class AddGiftPageModule {}
