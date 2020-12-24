
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

interface User {
  userName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User = {
    userName: '',
    email: '',
    password: '',
  };
  public loading: HTMLIonLoadingElement;

  constructor(
    private loadingCtrl: LoadingController,
    private authSvc: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    try {
      const res = await this.authSvc.loginUser(this.user.userName, this.user.email, this.user.password);
      // console.log('login: result of login = ', JSON.stringify(res, undefined, 2));
      this.loading.dismiss();
      this.router.navigateByUrl('/group-mgmt');
    } catch (error) {
      this.loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: error,
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }],
      });
      alert.present();
    }
  }

  async resetPassword(): Promise<void> {
    if (!this.user.email) {
      return;     // put up an alert or something.
    }

    console.log('password reset called')
    this.authSvc.resetPassword(this.user.email);
    const t = await this.toastCtrl.create({
      message: 'Email has been sent to you to use to reset your password.',
      duration: 2000,
    });
    await t.present();
  }

  async createAccount(): Promise<void> {
    try {
      await this.authSvc.signupUser(this.user.userName, this.user.email, this.user.password);
      this.router.navigateByUrl('/group-mgmt');
    } catch (error) {
      const alert = await this.alertCtrl.create({
        message: error,
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }],
      });
      alert.present();
    }
  }

}


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {

//   constructor(
//     public authSvc: AuthService,
//     private router: Router,
//   ) { }

//   ngOnInit() {
//   }

//   async signIn() {
//     await this.authSvc.googleSignin();
//     this.router.navigateByUrl('/group-mgmt');
//   }

// }
