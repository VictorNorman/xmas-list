import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupMgmtPageRoutingModule } from './group-mgmt-routing.module';
import { GroupMgmtPage } from './group-mgmt.page';
import { UserImageModule } from 'src/app/user-image/user-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupMgmtPageRoutingModule,
    UserImageModule,
  ],
  declarations: [GroupMgmtPage]
})
export class GroupMgmtPageModule { }
