import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: UserInfo[] = [];

  constructor(
    private router: Router,
    public authSvc: AuthService,
    private dataSvc: DataService,
  ) {
    this.dataSvc.usersSubj.subscribe(u => this.users = u);
  }

  goToGiftListPage(uid: number): void {
    this.router.navigateByUrl(`gift-list/${uid}`);
  }



}
