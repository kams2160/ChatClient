import { Router } from '@angular/router';
import { LoginService } from './../../login/shared/login.service';
import { Component, OnInit } from '@angular/core';

import { User } from './../../login/shared/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  success: boolean;
  error: boolean;

  constructor(
    public loginService: LoginService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.loginService.getUserData()
      .subscribe(
        (user) => this.user = <User>user,
        (err) => {
          this.error = true;
          this.user = {};
        }
      );
  }

  editUserData(name: string, surname: string, university: string, department: string, fieldOfStudy: string) {
    let user: User = {
      name: name,
      surname: surname,
      university: university,
      department: department,
      fieldOfStudy: fieldOfStudy,
    }

    this.loginService.updateUserData(user)
      .subscribe(
        (user) => this.success = true,
        (err) => {
          this.error = true;
          this.user = {};
        }
      );
  }
}
