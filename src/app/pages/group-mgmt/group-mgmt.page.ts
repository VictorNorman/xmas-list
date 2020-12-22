import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Group } from 'src/app/types';

@Component({
  selector: 'app-group-mgmt',
  templateUrl: './group-mgmt.page.html',
  styleUrls: ['./group-mgmt.page.scss'],
})
export class GroupMgmtPage implements OnInit {

  public groups: Group[] = [];
  public groupId = '';
  public newGroupName = '';
  public newGroupId = '';
  public feedback = '';
  public selectedGroup = '';
  public groupsLoaded = false;
  public action = 'select';

  constructor(
    private authSvc: AuthService,
    private dataSvc: DataService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
  ) {
    this.initialize();
  }

  async initialize() {
    const ld = await this.loadCtrl.create({
      message: "Loading groups...",
      duration: 2000,
    });
    await ld.present();
    this.dataSvc.groupsSubj.subscribe(groups => {
      if (!groups) {
        return;
      }
      this.groups = groups.filter(grp => grp.users.includes(this.authSvc.getUid()));
      console.log('gpmt: this.groups =', this.groups)
    });
    await ld.onDidDismiss();
    this.groupsLoaded = true;
  }

  selectAction(event) {
    console.log('event = ', event.detail.value);
    this.action = event.detail.value;
  }

  ngOnInit() {
  }

  groupSelected() {
    console.log('selectedGrp = ', this.selectedGroup);
    this.router.navigateByUrl(`/group/${this.selectedGroup}`);
  }

  joinGroup(): void {
    if (this.dataSvc.addUserToGroup(this.authSvc.getUid(), this.groupId)) {
      this.router.navigateByUrl(`/group/${this.groupId}`);
    }
  }

  async createNewGroup() {
    if (!this.newGroupName) {
      return;
    }
    console.log('getUid is', this.authSvc.getUid());
    this.newGroupId = await this.dataSvc.createNewGroup(this.authSvc.getUid(), this.newGroupName);
    if (this.newGroupId) {
      // toast to show success.
      await (await this.toastCtrl.create({
        message: `Group ${this.newGroupName} created, and you have been added to it.`,
        duration: 3000,
      })).present();
    } else {
      // toast on error.    // TODO how to get the error???
    }
  }

}
