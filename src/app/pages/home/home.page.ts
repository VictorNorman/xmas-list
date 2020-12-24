import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../../types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: UserInfo[] = [];
  userPhotoUrl = '';

  constructor(
    private router: Router,
    public authSvc: AuthService,
    private dataSvc: DataService,
  ) {
    this.dataSvc.usersSubj.subscribe(u => this.users = u);
    // this.userPhotoUrl = this.authSvc.getPhotoUrl();
  }

  goToGiftListPage(uid: number): void {
    this.router.navigateByUrl(`gift-list/${uid}`);
  }

}

/**
 * Making groups of users:
 * 1. Someone has to make the group. It gets a name, and unique id from firebase.
 *    Tell the user to send the unique id to others.  Does this person have a unique role?  Group admin??
 * 2. After login, if user has no group, then ask for unique id.  When entered, add user to that group.
 *    If user has 1 group, go to group page.  If user has > 1 group, have them choose which.
 * 3. Need page to remove a group, and remove a user from a group.  Who can do this?
 * 4.
 */
