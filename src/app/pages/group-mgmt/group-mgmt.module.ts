import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupMgmtPageRoutingModule } from './group-mgmt-routing.module';

import { GroupMgmtPage } from './group-mgmt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupMgmtPageRoutingModule
  ],
  declarations: [GroupMgmtPage]
})
export class GroupMgmtPageModule {}
