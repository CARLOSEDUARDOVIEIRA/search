import { Component, OnInit, OnDestroy } from '@angular/core';

import { debounceTime, map, distinctUntilChanged, switchMap, catchError, startWith } from 'rxjs/operators';
import { Subject, Subscription, of } from 'rxjs';
import { User } from '../core/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  public userList:      User[] = [];
  public user:          User = new User();
  public lastUser:      User = new User();
  public isLoading:     boolean;

  private filterString:   Subject<string> = new Subject<string>();
  private subscriptions = new Subscription();

  constructor (
    private spinner:        NgxSpinnerService,
    private toastrService:  ToastrService,
    private userService:    UserService,
  ) {}

  ngOnInit() {
    this.watchTextInput();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public eventHandler = ( event: any ) => {
    this.filterString.next(event.target.value);
  }

  public removeUser = () => {
    this.lastUser = {...this.user};
    this.user = new User();
  }

  public callUser = ( user: User ) => {
    if ( user.username === this.lastUser.username ) {
      this.user = this.lastUser;
      return;
    }
    this.getUserDetail(user.url);
  }

  private watchTextInput = () => {
    this.filterString.pipe(
      debounceTime(300),
      map(e => e.trim()),
      distinctUntilChanged(),
      switchMap( term => {
        if ( !term || term.length < 3 ) {
          return of([]);
        }

        this.spinner.show();
        this.isLoading = true;

        const userMatch = this.findUserByName( term );
        if ( userMatch.length ) {
          return of(userMatch);
        }

        return this.userService.fetchAllUsers( term );
      }),
      catchError( (error, source) => {

        this.spinner.hide();
        this.isLoading = false;

        switch ( error.status ) {
          case 404:
            this.toastrService.error('Nenhum usuário encontrado, verifique se digitou o nome corretamente!', 'U.ups!');
            break;
          default:
            this.toastrService.error( `Encontramos uma falha ao obter lista de usuários!
              Por favor tente novamente, se persistir contate o nosso suporte` );
            break;
        }

        return source.pipe(
          startWith([])
        );
      }),
    ).subscribe((users) => {
      this.spinner.hide();
      this.isLoading = false;
      this.userList = users;
    });
  }

  private findUserByName = ( username: string ) => {
    if ( !this.userList ) { return []; }

    return this.userList.filter( user => {
      return user.username === username;
    });
  }

  private getUserDetail = ( userProfileLink: string ) => {
    this.spinner.show();
    this.isLoading = true;
    this.subscriptions.add(
      this.userService.fetchUser( userProfileLink )
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
}
