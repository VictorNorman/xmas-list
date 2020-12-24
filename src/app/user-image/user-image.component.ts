import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss'],
})
export class UserImageComponent implements OnInit {

  public userName: string;
  @Input("in-header") in_header: boolean = false;

  constructor(
    private authSvc: AuthService,
  ) {
    this.userName = this.authSvc.getShortUserName();
  }

  ngOnInit() { }

}
