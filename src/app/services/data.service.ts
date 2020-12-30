import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { Gift, UserInfo, Comment, UserId, Group } from '../types';
import firebase from 'firebase/app';

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

  private groups: Group[] = [];
  public groupsSubj: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>(null);

  constructor(
    private db: AngularFirestore,
    private afStorage: AngularFireStorage,
  ) {
    this.db.collection<UserInfo>('users').valueChanges().subscribe(
      users => {
        this.users = users;
        this.usersSubj.next(this.users);
      }
    );
    this.db.collection<Comment>('comments', ref => ref.orderBy('timestamp'))
      .valueChanges().subscribe(res => {
        this.comments = res;
        this.commentsSubj.next(true);
      });

    this.db.collection<Gift>('gifts').valueChanges({ idField: 'giftid' })
      .subscribe(gifts => {
        console.log('dataService: gift list updated');
        this.gifts = gifts;
        console.log('gifts = ', JSON.stringify(this.gifts));
      });
    this.db.collection<Group>('groups').valueChanges({ idField: 'id' })
      .subscribe(groups => {
        console.log('dataservice: groups now = ', groups);
        this.groups = groups;
        this.groupsSubj.next(this.groups);
      });
  }

  // --------------------------------- User info ------------------------------------

  getUsers() {
    return this.users;
  }

  uidToName(uid: string) {
    return this.users.find(u => u.uid == uid).userName;
  }

  getUserFirstNameByUid(uid: string): string {
    return this.uidToName(uid);
  }

  saveUserInfo(uid: UserId, userName: string, email: string) {
    const data: UserInfo = {
      uid,
      userName,
      email,
      photoURL: '',
      groups: [],
    };
    console.log('saveUserInfo: ', data)
    this.db.collection<UserInfo>('users').doc(uid).set(data);
  }


  // -----------------------------------  Gifts -----------------------------------

  /**
   * Add the gift information to the Firebase Cloud Database and add the image to
   * Firebase Storage.
   * @param gift the gift
   * @returns giftid used in Cloud Firestore.
   */
  addGiftToDb(gift: Gift): string {
    this.saveGiftImage(gift);

    gift.giftid = this.db.createId();
    this.saveGift(gift);
    return gift.giftid;
  }

  private saveGift(gift) {
    // cute trick to get a new object, theRest, without imageUrl, imageData in it.
    const { imageUrl, imageData, ...theRest } = gift;
    // don't save the imageUrl which is an Observable of the image in the Firebase Storage.
    this.db.collection<Gift>('gifts').doc(gift.giftid).set({
      ...theRest,
    });
  }

  updateGiftInDb(gift: Gift) {
    console.log('updating giftid ', gift.giftid);
    console.log('  imageFilename = ', gift.imageFilename);
    this.saveGiftImage(gift);
    this.saveGift(gift);
  }

  private async saveGiftImage(gift: Gift) {
    if (gift.imageData) {
      // gift.imageData has the image in base64.
      const filename = new Date().getTime() + ".jpeg";
      const storageRef = this.afStorage.ref(filename);
      gift.imageFilename = filename;
      storageRef.putString(gift.imageData, 'base64', { contentType: 'image/jpeg' }).then(done => {
        console.log('saveGiftImage: putString done, imageFilname now', filename);
        storageRef.getDownloadURL().subscribe(url => {
          console.log('saveGiftImage: imageUrl now set.');
          gift.imageUrl = url;
        });
      });
    }
  }

  /**
   * return gifts for the given uid.
   * @param uid of the user we are getting gifts for.
   */
  getGifts(uid: string): Gift[] {
    const res = this.gifts.filter(g => g.uid === uid);
    this.getGiftImages(res);
    return res;
  }

  private getGiftImages(giftList: Gift[]) {
    giftList.forEach(gift => {
      gift.imageUrl = this.afStorage.ref(gift.imageFilename).getDownloadURL();
    });
  }

  /**
   * return gifts for the given uid, which were added by you yourself.
   * @param uid of the user we are getting gifts for.
   */
  getYourOwnGifts(uid: string) {
    const res = this.gifts.filter(g => g.uid === uid && g.whoAdded === uid);
    this.getGiftImages(res);
    return res;
  }

  markGiftClaimed(gift: Gift) {
    const foundIdx = this.gifts.findIndex(g => g.giftid = gift.giftid);
    if (foundIdx !== -1) {
      if (this.gifts[foundIdx].claimed !== gift.claimed) {
        this.db.collection('gifts').doc<Gift>(gift.giftid).update({
          claimed: gift.claimed,
        });
      }
    }
  }

  deleteGift(gift: Gift) {
    this.deleteImage(gift);
    this.db.collection<Gift>('gifts').doc(gift.giftid).delete();
  }

  deleteImage(gift) {
    if (gift.imageFilename) {
      this.afStorage.ref(gift.imageFilename).delete();
      gift.imageFilename = null;
      gift.imageData = null;
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


  // ----------------------------------------- groups ------------------------------------------

  addUserToGroup(userId: UserId, groupId: string) {
    const theGroup = this.groups.find(group => group.id === groupId);
    if (theGroup) {
      // Complaints from transpiler about the type of arrayUnion if you don't put .ref in there.
      this.db.collection<Group>('groups').doc(groupId).ref.update({
        users: firebase.firestore.FieldValue.arrayUnion(userId)
      });
      return true;
    } else {
      return false;
    }
  }

  async createNewGroup(adminUid: UserId, groupName: string, endDate: Date): Promise<string | null> {
    const grp: Group = {
      adminUid,
      name: groupName,
      users: [adminUid],
      endDate,
    }
    try {
      // console.log('createNewGroup: grp = ', JSON.stringify(grp, undefined, 2));
      const doc = await this.db.collection<Group>('groups').add(grp);
      return doc.id;
    } catch (error) {
      return null;
    }
  }

  /**
   * @returns the groups the given user is in.
   * @param userId id of the logged in user
   */
  getGroups(userId: UserId): Group[] {
    return this.groups.filter(grp => grp.users.includes(userId));
  }

  getUsersByGroup(groupId: string): UserInfo[] {
    // There will be only 1 match, so safe to do [0].
    console.log('getUserByGrp: groupId = ', groupId)
    const group = this.groups.find(grp => grp.id === groupId);
    console.log('getUserByGrp: group = ', group)
    const userIds = group.users;
    return userIds.map(id => this.users.find(u => u.uid === id));
  }

  getGroupName(groupId: string) {
    // There will be only 1 match, so safe to do [0].
    return this.groups.find(grp => grp.id === groupId).name;
  }
}

