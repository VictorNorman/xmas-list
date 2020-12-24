import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid: string = '';
  private email: string = '';
  private userName: string = '';

  constructor(
    private dataSvc: DataService,
  ) { }

  async loginUser(userName: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log(`trying to login with ${email}, ${password}`);
    this.email = email;
    this.userName = userName;
    return new Promise(async (resolve, reject) => {
      try {
        console.log('loginUser: calling signInWithEmail')
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('loginUser: calling signInWithEmail DONE, res: ', res)
        this.uid = res.user.uid;
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  signupUser(userName: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    this.email = email;
    this.userName = userName;
    return new Promise(async (resolve, reject) => {
      try {
        console.log('loginUser: calling createUser')
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('loginUser: calling createUser DONE, res: ', res)
        this.uid = res.user.uid;
        // New user: remember their userName, uid, etc.
        this.dataSvc.saveUserInfo(this.uid, userName, email);
        this.userName = userName;
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getCurrentUser(): string {
    return firebase.auth().currentUser.email;
  }

  getUid() {
    return this.uid;
  }

  getUserName() {
    return this.userName;
  }

  getShortUserName() {
    return this.userName || '?';
  }
}


// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { UserInfo } from '../types';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Router } from '@angular/router';

// import firebase from 'firebase/app';
// import 'firebase/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   user$: Observable<UserInfo>;

//   private userName = '';
//   private uid = '';
//   private photoUrl = '';

//   constructor(
//     private afAuth: AngularFireAuth,
//     private afs: AngularFirestore,
//     private router: Router,
//   ) {
//     this.user$ = this.afAuth.authState.pipe(
//       switchMap(user => {
//         if (user) {
//           return this.afs.doc<UserInfo>(`users/${user.uid}`).valueChanges();
//         } else {
//           return of(null);
//         }
//       })
//     );
//   }

//   async googleSignin() {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const credential = await this.afAuth.signInWithPopup(provider);
//     this.updateUserData(credential.user);
//   }

//   private updateUserData(user: firebase.User) {
//     const userRef: AngularFirestoreDocument<UserInfo> = this.afs.doc(`users/${user.uid}`);
//     // console.log('user = ', JSON.stringify(user, undefined, 2));
//     userRef.set({
//       uid: user.uid,
//       email: user.email,
//       userName: user.displayName,
//       photoURL: user.photoURL,
//     }, { merge: true });
//     this.userName = user.displayName;
//     this.photoUrl = user.photoURL;
//     this.uid = user.uid;
//   }

//   async signOut() {
//     await this.afAuth.signOut();
//     this.router.navigateByUrl('/login');    // TODO: really shouldn't do routing from a service.
//   }

//   getUserName() {
//     return this.userName;
//   }

//   getUid() {
//     return this.uid;
//   }

//   getPhotoUrl() {
//     return this.photoUrl;
//   }
// }


