import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../../types';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  users: UserInfo[] = [];
  userPhotoUrl = '';
  groupId = '';
  groupName = '';

  constructor(
    private router: Router,
    public authSvc: AuthService,
    private dataSvc: DataService,
    private actRt: ActivatedRoute,
  ) {
    this.userPhotoUrl = this.authSvc.getPhotoUrl();
  }

  ngOnInit() {
    this.groupId = this.actRt.snapshot.paramMap.get('groupid');
    this.groupName = this.dataSvc.getGroupName(this.groupId);

    this.dataSvc.groupsSubj.subscribe(grps => {
      // Whenever a group gets changed, see if there is a new user in this group.
      this.users = this.dataSvc.getUsersByGroup(this.groupId)
      console.log('grouppage: users = ', this.users);
    });
  }

  goToGiftListPage(uid: number): void {
    this.router.navigateByUrl(`gift-list/${uid}`);
  }

}
