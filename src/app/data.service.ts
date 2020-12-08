import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Gift, UserInfo, Comment } from './types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: UserInfo[] = [];
  public usersSubj: BehaviorSubject<UserInfo[]> = new BehaviorSubject<UserInfo[]>(null);
  private gifts: Gift[] = [];
  // public giftsSubj: BehaviorSubject<Gift[]> = new BehaviorSubject<Gift[]>(null);
  private comments: Comment[] = [];     // all comments in the db: will filter by giftid in code.

  // Just push out a value of true whenever new comments are added. The comments page has to
  // filter by gift id anyway.
  public commentsSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private db: AngularFirestore,
  ) {
    this.db.collection<UserInfo>('users').valueChanges().subscribe(
      users => {
        this.users = users;
        this.usersSubj.next(this.users);
      }
    );
    this.db.collection<Gift>('gifts').valueChanges({ idField: 'giftid' }).subscribe(
      gifts => {
        this.gifts = gifts;
      }
    );
    this.db.collection<Comment>('comments', ref => ref.orderBy('timestamp'))
      .valueChanges().subscribe(res => {
        this.comments = res;
        this.commentsSubj.next(true);
      });
  }

  addGiftToDb(gift: Gift) {
    this.db.collection<Gift>('gifts').add(gift);
  }

  getUsers() {
    return this.users;
  }

  uidToName(uid: string) {
    return this.users.find(u => u.uid == uid).userName;
  }

  getUserFirstNameByUid(uid: string): string {
    return this.uidToName(uid).split(' ')[0];
  }

  /**
   * return gifts for the given uid.
   * @param uid of the user we are getting gifts for.
   */
  getGifts(uid: string) {
    return this.gifts.filter(g => g.uid === uid);
  }

  /**
   * return gifts for the given uid, which were added by you yourself.
   * @param uid of the user we are getting gifts for.
   */
  getYourOwnGifts(uid: string) {
    return this.gifts.filter(g => g.uid === uid && g.whoAdded === uid);
  }

  markGiftClaimed(gift: Gift) {
    const foundIdx = this.gifts.findIndex(g => g.giftid = gift.giftid);
    if (foundIdx !== -1) {
      if (this.gifts[foundIdx].claimed !== gift.claimed) {
        this.db.collection('gifts').doc<Gift>(`${gift.giftid}`).update({
          claimed: gift.claimed,
        });
      }
    }
  }

  // ----------------------------------------- comments -------------------------------------------

  saveComment(comment: Comment): void {
    this.db.collection<Comment>('comments').add(comment);
  }

  getComments(giftid: string): Comment[] {
    return this.comments.filter(g => g.giftid === giftid);
  }

  getNumCommentsForAGift(giftid: string): number {
    return this.getComments(giftid).length;
  }

}

