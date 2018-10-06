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
  aResultUsers = [];
  sQuery = '';
  oUser = [];
  mostrarUserInfo = false;

  constructor(private rootService: ServiceRootService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.aResultUsers = JSON.parse( localStorage.getItem( 'aUsers' ) );
  }

  eventHandler(event: any) {
    if ( event.code.indexOf('Key') === -1 ) {
      return;
    }

    if ( event.target.value !== '' ) {
      this.sQuery += event.target.value;
      if ( this.sQuery.length > 4 ) {
        this.spinner.show();
        if ( this.aResultUsers ) {
          this.FindUserByName( { 'login' : this.sQuery } );
        } else {
          this.RequestUsers( this.sQuery );
        }
      }
      this.sQuery = '';
    }

  }

  FindUserByName = ( filter ) => {
    const filterKeys = ['login'];
    let aOccurrence = this.aResultUsers.filter(item => {
      return filterKeys.some((keyName) => {
        return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
      });
    });

    if ( aOccurrence.length === 0 ) {
      this.RequestUsers(filter.login);
    } else {
      this.spinner.hide();
    }

  }

  RequestUsers = ( sNameUser: string ) => {
    this.rootService.GetUsers( sNameUser, ( aUsersGitHub ) => {
      if ( aUsersGitHub ) {
        this.aUsersGitHub = aUsersGitHub.items;
        localStorage.setItem( 'aUsers', JSON.stringify( this.aUsersGitHub ) );
        this.aResultUsers = JSON.parse( localStorage.getItem( 'aUsers' ) );
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  ListUserInformation = ( aUser ) => {
    this.spinner.show();
    this.rootService.GetUserInfo( aUser.url, ( aUserInfo ) => {
      if ( aUserInfo ) {
        this.oUser = aUserInfo;
        this.mostrarUserInfo = true;
        this.spinner.hide();
      }
    });
  }

  backSearch = () => {
    this.mostrarUserInfo = false;
  }
}
