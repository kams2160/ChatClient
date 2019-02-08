import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { HeadersService } from './../../shared/services/headers.service';
import { StorageService } from './../../shared/services/storage.service';

import { User } from './user.model';

@Injectable()
export class LoginService {
  isUserAuthenticated: boolean;
  isAdmin: boolean;
  email: string;
  userId: string;

  constructor(
    public http: Http,
    public headersService: HeadersService,
    public storageService: StorageService
  ) {
    this.isUserAuthenticated = false;
  }

  signIn(login: string, password: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', login);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');

    return this.http.post('/api/token', urlSearchParams.toString(), { headers: headers })
      .map(this.extractData)
      .do((data: any) => this.setToken(data.access_token))
      .mergeMap(() => this.checkUser())
  }

  signUp(user: User): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/account/register', user, { headers: headers })
      .map(this.extractData)
      .do((data: any) => {
        this.setToken(data.access_token);
        this.setUserData(data);
        this.authenticate();
      });
  }

  signOut(): Observable<any> {
    return Observable.of(this.removeToken())
      .do(() => this.removeAuthentication());
  }

  getUserData() {
    return this.http.get('api/Account/UserData', { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  updateUserData(user: User) {
    return this.http.put('api/Account/UserData', user, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  extractData(response: Response): Observable<any> {
    let body = response.json();
    return body || {};
  }

  catchError(error): ErrorObservable {
    return Observable.throw(error);
  }

  authenticate() {
    this.isUserAuthenticated = true;
  }

  removeAuthentication() {
    this.isUserAuthenticated = false;
  }

  setToken(token: string) {
    this.headersService.setBearerToken(token);
    this.storageService.setItem('token', token);
  }

  setUserData(user: any) {
    this.email = user.email;
    this.userId = user.id;
    this.isAdmin = user.isAdmin;
  }

  removeToken() {
    this.headersService.clearHeaders();
    this.storageService.removeItem('token');
  }

  checkUser(): Observable<any> {
    return this.http.get('api/Account/UserData', { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .do(() => this.authenticate())
      .do((data: any) => this.setUserData(data))
      .catch(this.catchError);
  }
  
  checkAuhorization(): Observable<any> {
    return this.http.get('api/Account/IsBlocked', { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  readToken(): Observable<any> {
    return this.storageService.getItem('token')
      .map(token => this.setToken(token));
  }
}
