import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { HeadersService } from './../../../shared/services/headers.service';

@Injectable()
export class FriendService {
  page: number;
  limit: number;
  invitation: number;

  constructor(
    public http: Http,
    public headersService: HeadersService) {
    this.page = 1;
    this.limit = 5;
    this.invitation = 0;
  }

  extractData(response: Response): Observable<any> {
    let body = response.json();
    return body || {};
  }

  catchError(error): ErrorObservable {
    return Observable.throw(error);
  }

  findNewFriendsLike(name: string, page: number, limit: number) {
    return this.http.get(`api/Users?name=${name}&page=${page || this.page}&limit=${limit || this.limit}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  getUsers(page: number, limit: number) {
    return this.http.get(`api/Users?name=&page=${page || this.page}&limit=${limit || this.limit}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  getFriends(profilId: string) {
    return this.http.get(`api/Friends?profilId=${profilId}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  getFriendProfil(userId: string) {
    return this.http.get(`api/Users?userId=${userId}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  getInvitation(userId: string) {
    return this.http.get(`api/Friends/${userId}/invitation`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  addToFriends(userId: string, invitedUserId: string) {
    let body = {
      userId: userId,
      invitedUserId: invitedUserId
    }

    return this.http.post('api/Friends', body, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  removeFromFriends(friendId: string) {
    return this.http.delete(`api/Friends?friendId=${friendId}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  acceptFriend(friendId: string) {
    return this.http.patch(`api/Friends/${friendId}/accept`, {}, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  blockUser(userId: string) {
    return this.http.patch(`api/Account/BlockUser?userId=${userId}`, {}, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  unblockUser(userId: string) {
    return this.http.patch(`api/Account/UnblockUser?userId=${userId}`, {}, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }
}