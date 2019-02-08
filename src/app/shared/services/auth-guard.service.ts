import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';

import { LoginService } from './../../login/shared/login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    public router: Router,
    public loginService: LoginService) { }

  canActivate() {
    return this.checkLogin();
  }

  canActivateChild(): boolean {
    return this.checkLogin();
  }
  
  canLoad(): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.loginService.isUserAuthenticated) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}