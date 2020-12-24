import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupPageRoutingModule } from './group-routing.module';
import { GroupPage } from './group.page';
import { UserImageModule } from 'src/app/user-image/user-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    UserImageModule,
  ],
  declarations: [GroupPage]
})
export class GroupPageModule { }
