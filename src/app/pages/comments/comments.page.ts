import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from '../../types';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  private giftid: string;

  public comments: Comment[] = [];
  public newComment: string;
  @ViewChild('content', { static: false }) contentArea: IonContent;

  constructor(
    private actRt: ActivatedRoute,
    public dataSvc: DataService,
    private authSvc: AuthService,
  ) { }

  ngOnInit() {
    this.giftid = this.actRt.snapshot.paramMap.get('giftid');
    this.dataSvc.commentsSubj.subscribe((val: boolean) => {
      if (val) {  // new comment added for some gift.
        this.comments = this.dataSvc.getComments(this.giftid);
        console.log('this.contentArea = ', this.contentArea);
        if (this.contentArea) {
          this.contentArea.scrollToBottom();
        }
      }
    });
  }

  addComment() {
    const data = {
      giftid: this.giftid,
      message: this.newComment,
      uid: this.authSvc.getUid(),
      timestamp: new Date(),
    };
    this.dataSvc.saveComment(data);
    this.newComment = '';
  }


}
