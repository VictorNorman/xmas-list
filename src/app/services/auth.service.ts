import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserInfo } from '../types';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserInfo>;

  private userName = '';
  private uid = '';
  private photoUrl = '';

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserInfo>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigateByUrl('/home');
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<UserInfo> = this.afs.doc(`users/${user.uid}`);
    // console.log('user = ', JSON.stringify(user, undefined, 2));
    userRef.set({
      uid: user.uid,
      email: user.email,
      userName: user.displayName,
      photoURL: user.photoURL,
    }, { merge: true });
    this.userName = user.displayName;
    this.photoUrl = user.photoURL;
    this.uid = user.uid;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  getUserName() {
    return this.userName;
  }

  getUid() {
    return this.uid;
  }
}
