import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceRootService {

  constructor(private http: HttpClient) {}

  GetUsers = ( sNameUser, callback ) => {
    // 'https://api.github.com/search/users?q=' + sNameUser + '+in:fullname'
    this.http.get( 'https://api.github.com/search/users?q=' + sNameUser ).subscribe( resp => {
      callback( resp );
    }, err => {
      callback(err.error.msg);
    });
  }

  GetUserInfo = ( sUrlUser, callback )  => {
    this.http.get( sUrlUser ).subscribe( resp => {
      callback( resp );
    }, err => {
      callback(err.error.msg);
    });
  }
}
