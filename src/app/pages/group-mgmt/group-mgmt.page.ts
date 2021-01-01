import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Group } from 'src/app/types';
import { endOfDay, addDays, parseISO } from 'date-fns';
import { AdMobFreeInterstitial } from '@ionic-native/admob-free/ngx';
import { AdmobService } from 'src/app/services/admob.service';


const DAYS_PAST_EVENT_TO_HOLD_DATA = 3;
@Component({
  selector: 'app-group-mgmt',
  templateUrl: './group-mgmt.page.html',
  styleUrls: ['./group-mgmt.page.scss'],
})
export class GroupMgmtPage {

  public groups: Group[] = [];
  public groupId = '';
  public newGroupName = '';
  public newGroupId = '';
  public feedback = '';
  public selectedGroup = '';
  public groupsLoaded = false;
  public action = 'select';
  public groupEventDate = null;
  public keepEventForever = false;

  constructor(
    private authSvc: AuthService,
    private dataSvc: DataService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private emailComp: EmailComposer,
    private admobSvc: AdmobService,
  ) {
    this.initialize();
  }

  async initialize() {
    const ld = await this.loadCtrl.create({
      message: "Loading groups...",
      duration: 2000,
      cssClass: 'loading-popup',
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

  ionViewWillEnter() {
    this.admobSvc.showBanner();
  }

  selectAction(event) {
    // console.log('event = ', event.detail.value);
    this.action = event.detail.value;
  }

  groupSelected() {
    this.router.navigateByUrl(`/group/${this.selectedGroup}`);
  }

  async joinGroup(): Promise<void> {
    if (this.dataSvc.addUserToGroup(this.authSvc.getUid(), this.groupId)) {
      this.router.navigateByUrl(`/group/${this.groupId}`);
    } else {
      await (await this.toastCtrl.create({
        message: `The group with the given id does not exist.`,
        duration: 3000,
      })).present();
    }
  }

  async createNewGroup() {

    const date = parseISO(this.groupEventDate);
    console.log('this.groupEventDate = ', this.groupEventDate, ' is type of ', typeof this.groupEventDate);
    if (!this.newGroupName) {
      return;
    }

    const endDate = this.keepEventForever ? addDays(new Date(), 10000) : addDays(endOfDay(date), DAYS_PAST_EVENT_TO_HOLD_DATA);

    this.newGroupId = await this.dataSvc.createNewGroup(this.authSvc.getUid(), this.newGroupName, endDate);
    if (this.newGroupId) {
      // toast to show success.
      await (await this.toastCtrl.create({
        message: `Group ${this.newGroupName} created, and you have been added to it.`,
        duration: 3000,
      })).present();
    } else {
      await (await this.toastCtrl.create({
        message: `Group ${this.newGroupName} could not be created.`,
        duration: 3000,
      })).present();
    }
  }

  async sendIdInEmail() {
    const email: EmailComposerOptions = {
      app: 'gmail',
      subject: 'Join Gift Manager group',
      isHtml: false,
      body: `I have created a group in the Gift Manager app with the unique id ${this.newGroupId}. To join the group, you need to enter this id.`,
    };
    await this.emailComp.open(email);
  }

}
