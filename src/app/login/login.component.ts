import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './shared/user.model';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: boolean;
  createError: boolean;
  wantCreate: boolean;

  constructor(
    public loginService: LoginService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  signIn(login: string, password: string) {
    this.loginError = false;
    this.loginService.signIn(login, password)
      .subscribe(
      () => this.router.navigate(['chat']),
      (err) => this.loginError = true
      )
  }

  signUp(login: string, name: string, surname: string, university: string, department: string, fieldOfStudy: string, password: string, confirmPassword: string) {
    this.createError = false;
    let user: User = {
      email: login,
      name: name,
      surname: surname,
      university: university,
      department: department,
      fieldOfStudy: fieldOfStudy,
      password: password,
      confirmPassword: confirmPassword
    };

    this.loginService.signUp(user)
      .subscribe(
      () => {
        this.loginService.signIn(login, password)
          .subscribe(
          () => this.router.navigate(['chat']),
          (err) => this.loginError = true
          )
      },
      (err) => this.createError = true
      )
  }
}
