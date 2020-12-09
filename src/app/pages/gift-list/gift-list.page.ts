import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Gift } from 'src/app/types';
import { AddGiftPage } from '../add-gift/add-gift.page';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.page.html',
  styleUrls: ['./gift-list.page.scss'],
})
export class GiftListPage implements OnInit {

  public uid: string;
  public userFirstName = '';

  public yourOwnList = false;

  public gifts: Gift[] = [];

  constructor(
    private actRt: ActivatedRoute,
    private modal: ModalController,
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
    this.userFirstName = this.dataSvc.getUserFirstNameByUid(this.uid);
  }


  /**
   * Adding a new gift for the user for the given uid.
   */
  async addGift(uid: string) {
    const modal = await this.modal.create({
      component: AddGiftPage,
      componentProps: {
        uid,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss<Gift>();
    this.gifts.push(data);
    this.dataSvc.addGiftToDb(data);
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
}
