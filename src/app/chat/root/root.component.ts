import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../login/shared/login.service';
import { FriendService } from './../shared/services/friend.service';

import { User } from './../../login/shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  friends: User[];
  searcher: string;
  invitationCounter: Subscription;
  authorizationChecker: Subscription;

  private searchTermStream = new Subject<string>();

  constructor(
    public loginService: LoginService,
    public friendService: FriendService,
    public router: Router
  ) {
    this.searchTermStream
      .debounceTime(600)
      .distinctUntilChanged()
      .switchMap((term: string) => this.friendService.findNewFriendsLike(this.searcher, 1, 5))
      .subscribe((data: any) => this.friends = data.friends)
  }

  ngOnInit() {
    this.invitationCounter = Observable.timer(0, 10000)
      .subscribe(() => this.checkInvitation());

    this.authorizationChecker = Observable.timer(0, 7000)
      .subscribe(() => this.checkAuhorization());
  }

  logout() {
    this.loginService.signOut()
      .subscribe(
      () => {
        this.invitationCounter.unsubscribe();
        this.authorizationChecker.unsubscribe();
        this.router.navigate(['']);
      },
      (error) => { }
      )
  }

  searchFriends() {
    this.searchTermStream.next(this.searcher);
  }

  fullSearch() {
    this.router.navigate(['/chat/searcher', this.searcher]);
  }

  showProfil(friendId: string) {
    this.router.navigate(['/chat/profil', friendId]);
  }

  checkInvitation() {
    this.friendService.getInvitation(this.loginService.userId)
      .subscribe((friends: User[]) => this.friendService.invitation = friends.length, () => { })
  }

  checkAuhorization() {
    this.loginService.checkAuhorization()
      .subscribe((data: any) => {
        if (data.isBlocked === true) {
          this.logout();
        }
      }, () => { })
  }
}
