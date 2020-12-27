import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Gift } from 'src/app/types';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.page.html',
  styleUrls: ['./add-gift.page.scss'],
})
export class AddGiftPage implements OnInit {

  public name = '';
  public info = '';
  public cost = 0;
  public url = '';
  public image: string | null = null;
  public imageURL: string | null = null;

  @Input() uid: string;

  constructor(
    private modal: ModalController,
    private authSvc: AuthService,
    private photoSvc: PhotoService,
  ) { }

  ngOnInit() {
  }

  /**
   * A new gift entered into the system.
   * @param giftFor who the gift is for -- by userId.   TODO
   */
  addNewGift() {
    const data: Gift = {
      uid: this.uid,
      name: this.name,
      info: this.info,
      cost: this.cost,
      claimed: false,
      whoAdded: this.authSvc.getUid(),
      url: this.url,
      image: this.image,
    };
    this.modal.dismiss(data);
  }

  cancel() {
    this.modal.dismiss(null);
  }

  async takePicture() {
    this.image = await this.photoSvc.takePicture();
    this.imageURL = "data:image/jpeg;base64," + this.image;
  }

}
