import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiftListPage } from './gift-list.page';

const routes: Routes = [
  {
    path: '',
    component: GiftListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftListPageRoutingModule {}
