import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Gift } from 'src/app/types';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.page.html',
  styleUrls: ['./add-gift.page.scss'],
})
export class AddGiftPage implements OnInit {

  public gift: Gift;

  // one of these two is provided: if uid, then adding a new gift. If inGift, then editing a gift.
  @Input() uid: string;
  @Input() inGift: Gift;

  constructor(
    private modal: ModalController,
    private authSvc: AuthService,
    private photoSvc: PhotoService,
  ) { }

  ngOnInit() {
    // editing a gift;
    if (this.inGift) {
      this.gift = this.inGift;
    } else {
      this.gift = {
        name: '',
        info: '',
        cost: 0,
        url: '',
        image: null,
        imageUrl: null,
        claimed: false,
        uid: this.uid,
        whoAdded: this.authSvc.getUid(),
      };
    }
  }

  addNewGift() {
    this.modal.dismiss(this.gift);
  }

  cancel() {
    this.modal.dismiss(null);
  }

  async takePicture() {
    this.gift.image = await this.photoSvc.takePicture();
    // this.imageURL = "data:image/jpeg;base64," + this.image;
  }

}
