import { Component, OnInit } from '@angular/core';
import { ServiceRootService } from '../service-root.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

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
  showUserInfo = false;
  showWarningNoFound = false;

  constructor(private rootService: ServiceRootService, private spinner: NgxSpinnerService) {}

  private filterString: Subject<string> = new Subject<string>();


  eventHandler(event: any) {
    this.showWarningNoFound = false;
    if ( event.code.indexOf('Key') === -1 ) {
      return;
    }
    let value = event.target.value;

    if ( value !== '' ) {
      this.filterString.next(value);
    }
  }

  ngOnInit() {
    this.showWarningNoFound = false;
    this.aResultUsers = JSON.parse( localStorage.getItem( 'aUsers' ) );
    this.filterString.pipe(
      debounceTime(300)
    ).subscribe( searchingUser => {
      if ( this.aResultUsers ) {
        this.FindUserByName( { 'login' : searchingUser } );
      } else {
        this.RequestUsers( searchingUser );
      }
    });
  }

  FindUserByName = ( filter ) => {
    this.spinner.show();
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
    this.spinner.show();
    this.rootService.GetUsers( sNameUser, ( aUsersGitHub ) => {
      if ( aUsersGitHub && aUsersGitHub.items.length > 0 ) {
        this.aUsersGitHub = aUsersGitHub.items;
        localStorage.setItem( 'aUsers', JSON.stringify( this.aUsersGitHub ) );
        this.aResultUsers = JSON.parse( localStorage.getItem( 'aUsers' ) );
        this.spinner.hide();
      } else {
        this.showWarningNoFound = true;
        this.spinner.hide();
      }
    });
  }

  ListUserInformation = ( aUser ) => {
    this.spinner.show();
    this.rootService.GetUserInfo( aUser.url, ( aUserInfo ) => {
      if ( aUserInfo ) {
        this.oUser = aUserInfo;
        this.showUserInfo = true;
        this.spinner.hide();
      } else {
        this.showWarningNoFound = true;
      }
    });
  }

  backSearch = () => {
    this.showUserInfo = false;
  }
}
