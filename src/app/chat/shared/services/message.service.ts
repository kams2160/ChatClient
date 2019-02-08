import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { HeadersService } from './../../../shared/services/headers.service';
import { LoginService } from './../../../login/shared/login.service';

import { Message } from './../models/message.model';

@Injectable()
export class MessageService {
  page: number;
  limit: number;

  constructor(
    public http: Http,
    public headersService: HeadersService,
    public loginService: LoginService) {
      this.page = 1;
      this.limit = 5;
  }

  extractData(response: Response): Observable<any> {
    let body = response.json();
    return body || {};
  }

  catchError(error): ErrorObservable {
    return Observable.throw(error);
  }

  getMessagesFromUser(lastMessageId: number, friendId: string, page?: number, limit?: number) {
    let userId = this.loginService.userId;

    return this.http.get(`api/Messages?lastMessageId=${lastMessageId}&userId=${userId}&friendId=${friendId}&page=${page || this.page}&limit=${limit || this.limit}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  addMesssage(message: Message) {
    return this.http.post(`api/Messages`, message, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }
}