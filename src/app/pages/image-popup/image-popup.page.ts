import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Gift } from 'src/app/types';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.page.html',
  styleUrls: ['./image-popup.page.scss'],
})
export class ImagePopupPage implements OnInit {

  @Input() gift: Gift;

  constructor(
    private popCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.popCtrl.dismiss();
  }

}
