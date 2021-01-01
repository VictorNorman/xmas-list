import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Injectable({ providedIn: 'root' })
export class AdmobService {

  private bannerConfig: AdMobFreeBannerConfig = {
    isTesting: true,   // remove for production
    autoShow: true,
    id: 'ca-app-pub-2105599790569352/1601213907',
  };

  constructor(
    public platform: Platform,
    private admobFree: AdMobFree,
  ) {
    platform.ready().then(() => {
      this.admobFree.banner.config(this.bannerConfig);
    }).catch(error => {
      console.log('error in ctor: ', error);
    });
  }

  public showBanner() {
    this.admobFree.banner.prepare().then(() => {
      console.log('BANNER LOADED');
    }).catch(e => console.log('PROBLEM LOADING BANNER: ', e));
  }
}