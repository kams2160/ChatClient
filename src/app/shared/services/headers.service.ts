import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HeadersService {
  httpHeaders: Headers;

  constructor() {
    this.httpHeaders = new Headers();
  }

  setBearerToken(token: string) {
    this.clearHeaders();
    this.httpHeaders.append('Authorization', `Bearer ${token}`);
  }

  clearHeaders() {
    this.httpHeaders = new Headers();
  }
}
