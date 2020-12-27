import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Gift } from 'src/app/types';
import { AddGiftPage } from '../add-gift/add-gift.page';
import { ImagePopupPage } from '../image-popup/image-popup.page';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.page.html',
  styleUrls: ['./gift-list.page.scss'],
})
export class GiftListPage implements OnInit {

  public uid: string;
  public userName = '';
  public yourOwnList = false;
  public gifts: Gift[] = [];

  constructor(
    private actRt: ActivatedRoute,
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
    private dataSvc: DataService,
    private authSvc: AuthService,
  ) {
  }

  ngOnInit() {
    this.uid = this.actRt.snapshot.paramMap.get('uid');
    this.yourOwnList = this.uid === this.authSvc.getUid();
    // if you are looking at your own gift list, do not show those added by others.
    this.gifts = this.yourOwnList ? this.dataSvc.getYourOwnGifts(this.uid) : this.dataSvc.getGifts(this.uid);
    // console.log('gift-listpage, gifts set to ', this.gifts);
    this.userName = this.dataSvc.uidToName(this.uid);
    console.log('gift-list: username set to ', this.userName);
    // this.userPhotoUrl = this.authSvc.getPhotoUrl();
  }


  /**
   * Adding a new gift for the user for the given uid.
   */
  async addGift(uid: string) {
    const modal = await this.modalCtrl.create({
      component: AddGiftPage,
      componentProps: {
        uid,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss<Gift>();
    if (data) {
      this.gifts.push(data);
      this.dataSvc.addGiftToDb(data);
    }
  }

  delete(idx: number) {
    this.gifts.splice(idx, 1);
    // console.log(JSON.stringify(gift, undefined, 2));
  }

  claimedClicked(gift: Gift) {
    this.dataSvc.markGiftClaimed(gift);
  }

  getNumCommentsForAGift(gift: Gift): number {
    return this.dataSvc.getNumCommentsForAGift(gift.giftid);
  }

  youAdded(gift: Gift): boolean {
    return gift.whoAdded === this.authSvc.getUid();
  }

  makeImageUrl(imgData: string): string {
    return "data:image/jpeg;base64," + imgData;
  }

  /**
   * show the image of a gift in a large pop-up.
   * @param gift the gift for which to show the image in a large popup.
   */
  async showLargeImage(gift: Gift) {
    const imageAlert = await this.popCtrl.create({
      cssClass: 'image-modal',
      component: ImagePopupPage,
      componentProps: {
        gift,
      },
    });
    await imageAlert.present();
  }
}
