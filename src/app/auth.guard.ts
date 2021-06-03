import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('Authguard.canActivate(): hello');
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          // console.log('User is logged in!!');
          resolve(true);
        } else {
          // console.log('User is not logged in -- putting them back on the login page');
          this.router.navigateByUrl('login');
          resolve(false);
        }
      });
    });
  }

}