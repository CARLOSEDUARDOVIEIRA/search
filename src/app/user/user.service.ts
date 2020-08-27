import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../core/models/user.model';
import { timeout, catchError, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private timeout = 15000;

  constructor(
    private http: HttpClient
  ) {}

  public fetchAllUsers = ( name: string ): Observable<User[]> => {
    return this.http.get(`https://api.github.com/search/users?q=${name}`)
    .pipe(
      timeout(this.timeout),
      pluck('items'),
      map( ( users: any ) => {
        const firstResults = users.slice(0, 9);
        if ( !firstResults ) {
          return [];
        }
        return firstResults.map( ( user: any ) => {
          return User.build(user);
        });
      }),
    );
  }

  public fetchUser = ( url: string ): Observable<User>  => {
    return this.http.get( url ).pipe(
      timeout(this.timeout),
      catchError( error => {
        switch ( error.status ) {
          case 404:
            return throwError('Usuário não encontrado!');
          default:
            return throwError(`Encontramos uma falha ao obter detalhes do usuário!
              Por favor tente novamente mais tarde, se persistir entre em contato com nossa equipe de suporte.`);
        }
      }),
      map( ( user ) => {
        return User.build(user);
      })
    );
  }
}
