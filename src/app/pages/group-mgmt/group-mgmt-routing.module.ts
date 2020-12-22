import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupMgmtPage } from './group-mgmt.page';

const routes: Routes = [
  {
    path: '',
    component: GroupMgmtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupMgmtPageRoutingModule {}
