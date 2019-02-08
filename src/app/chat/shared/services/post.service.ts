import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { HeadersService } from './../../../shared/services/headers.service';
import { LoginService } from './../../../login/shared/login.service';

import { Post } from './../models/post.model';

@Injectable()
export class PostService {
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

  getPostsFromUser(userId?: string, page?: number, limit?: number) {
    userId = userId || this.loginService.userId;

    return this.http.get(`api/Posts?userId=${userId}&page=${page || this.page}&limit=${limit || this.limit}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  addPost(post: Post) {
    return this.http.post(`api/Posts`, post, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }

  removePostsFromUser(userId: string) {
    return this.http.delete(`api/DeletePostsFromUser/?userId=${userId}`, { headers: this.headersService.httpHeaders })
      .map(this.extractData)
      .catch(this.catchError);
  }
}