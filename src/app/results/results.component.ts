import { Component, OnInit } from '@angular/core';
import { ServiceRootService } from '../service-root.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  aUsersGitHub = [];
  sQuery = '';

  constructor(private rootService: ServiceRootService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
  }

  eventHandler(event: any) {
    if ( event.code.indexOf('Key') === -1 ) {
      return;
    }

    if ( event.target.value !== '' ) {
      this.sQuery += event.target.value;
      if ( this.sQuery.length > 5 ) {
        this.FindUserByName( this.sQuery );
      }
      this.sQuery = '';

    }

  }

  FindUserByName = ( sNameUser: string ) => {
    this.spinner.show();

    if ( this.aUsersGitHub.length > 0) {
      console.log( this.aUsersGitHub );
      this.spinner.hide();
    } else {
      this.RequestUsers(sNameUser);
      console.log(this.aUsersGitHub);
    }

  }

  RequestUsers = ( sNameUser: string ) => {
    this.rootService.GetUsers( sNameUser, ( aUsersGitHub ) => {
      if ( aUsersGitHub !== 'void 0' ) {
        this.aUsersGitHub.push( aUsersGitHub.items );
        this.spinner.hide();
      }
    });
  }

}
