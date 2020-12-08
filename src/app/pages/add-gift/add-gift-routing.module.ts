import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGiftPage } from './add-gift.page';

const routes: Routes = [
  {
    path: '',
    component: AddGiftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGiftPageRoutingModule {}
