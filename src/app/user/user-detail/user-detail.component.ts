import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  @Input() user = new User;

  @Output() toUserList = new EventEmitter<boolean>();

  constructor() {}

  toUserProfile = () => {
    window.open( this.user.profileLink, '_blank' );
  }
}
