import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagePopupPageRoutingModule } from './image-popup-routing.module';

import { ImagePopupPage } from './image-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagePopupPageRoutingModule
  ],
  declarations: [ImagePopupPage]
})
export class ImagePopupPageModule {}
