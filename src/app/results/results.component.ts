import { Component, OnInit, OnDestroy } from '@angular/core';

import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { User } from '../core/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceRootService } from '../service-root.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  public userList:      User[] = [];
  public user:          User = new User();
  public isLoading:     boolean;

  private filterString:   Subject<string> = new Subject<string>();
  private subscriptions = new Subscription();

  constructor (
    private rootService: ServiceRootService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.filterString.pipe(
      debounceTime(300)
      ).subscribe( searchingUser => {
        if ( this.userList.length ) {
          this.FindUserByName( { 'login' : searchingUser } );
        } else {
          this.getUsers( searchingUser );
        }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  eventHandler(event: any) {
    if ( event.code.indexOf('Key') === -1 ) {
      return;
    }
    const value = event.target.value;

    if ( value !== '' ) {
      this.filterString.next(value);
    }
  }

  FindUserByName = ( filter ) => {
    this.spinner.show();
    const filterKeys = ['login'];
    const aOccurrence = this.userList.filter(item => {
      return filterKeys.some((keyName) => {
        return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === '';
      });
    });

    if ( aOccurrence.length === 0 ) {
      this.getUsers(filter.login);
    } else {
      this.spinner.hide();
    }

  }

  public removeUser = () => {
    this.user = new User();
  }

  public getUserDetail = ( userProfileLink: string ) => {
    this.spinner.show();
    this.isLoading = true;
    this.subscriptions.add(
      this.rootService.fetchUser( userProfileLink )
      .subscribe( ( user: User ) => {
        this.spinner.hide();
        this.isLoading = false;
        this.user = user;
      }, error => {
        this.spinner.hide();
        this.isLoading = false;
        this.toastrService.error(error, 'U.ups!');
      })
    );
  }

  private getUsers = ( name: string ) => {
    this.spinner.show();
    this.isLoading = true;
    this.subscriptions.add(
      this.rootService.fetchAllUsers( name )
      .subscribe( ( users ) => {
        this.spinner.hide();
        this.isLoading = false;
        this.userList = users;
      }, error => {
        this.spinner.hide();
        this.isLoading = false;
        this.toastrService.error(error, 'U.ups!');
      }),
    );
  }
}
