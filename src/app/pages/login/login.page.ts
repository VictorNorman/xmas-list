import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authSvc: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async signIn() {
    await this.authSvc.googleSignin();
    this.router.navigateByUrl('/group-mgmt');
  }

}