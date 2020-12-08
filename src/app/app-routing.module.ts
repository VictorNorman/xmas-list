import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'gift-list/:uid',
    loadChildren: () => import('./pages/gift-list/gift-list.module').then(m => m.GiftListPageModule)
  },
  {
    path: 'add-gift',
    loadChildren: () => import('./pages/add-gift/add-gift.module').then(m => m.AddGiftPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'comments/:giftid',
    loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
