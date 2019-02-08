import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './shared/services/storage.service';
import { LoginService } from './login/shared/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    public loginService: LoginService,
    public storageService: StorageService
  ) {
    this.initApp();
  }

  ngOnInit() {
    
  }

  initApp() {
    this.loginService.readToken()
      .flatMap(() => this.loginService.checkUser())
      .subscribe(
        () => this.router.navigate(['']),
        (error) => this.loginService.removeToken()
      )
  }
}
