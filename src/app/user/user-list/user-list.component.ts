import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  @Input() userList:   User[] = [];

  @Output() callUser = new EventEmitter<User>();

  constructor() {}

  public getUserDetail = ( user: User ) => {
    this.callUser.next( user );
  }
}
