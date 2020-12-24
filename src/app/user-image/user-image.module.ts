import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserImageComponent } from './user-image.component';

@NgModule({
  declarations: [UserImageComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports: [UserImageComponent]
})
export class UserImageModule { }