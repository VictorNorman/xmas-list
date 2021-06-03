import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'gift-list/:uid',
    loadChildren: () => import('./pages/gift-list/gift-list.module').then(m => m.GiftListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-gift',
    loadChildren: () => import('./pages/add-gift/add-gift.module').then(m => m.AddGiftPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'comments/:giftid',
    loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'group-mgmt',
    loadChildren: () => import('./pages/group-mgmt/group-mgmt.module').then(m => m.GroupMgmtPageModule)
  },
  {
    path: 'group/:groupid',
    loadChildren: () => import('./pages/group/group.module').then(m => m.GroupPageModule)
  },
  {
    path: 'image-popup',
    loadChildren: () => import('./pages/image-popup/image-popup.module').then(m => m.ImagePopupPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
