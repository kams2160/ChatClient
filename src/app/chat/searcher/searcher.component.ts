import { Observable, Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../login/shared/login.service';
import { FriendService } from './../shared/services/friend.service';

import { User } from './../../login/shared/user.model';

@Component({
    selector: 'searcher',
    templateUrl: './searcher.component.html',
    styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
    friends: User[];
    searcher: string;
    page: number;
    limit: number;
    hasError: boolean;
    hasMoreData: boolean;

    constructor(
        public loginService: LoginService,
        public friendService: FriendService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.friends = [];
        this.page = 1;
        this.limit = 5;
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                this.setDefaults();
                this.searcher = params['searcher'];
                return this.friendService.findNewFriendsLike(this.searcher, this.page, this.limit);
            })
            .subscribe(
                (data: any) => {
                    this.friends = data.friends;
                    this.hasMoreData = data.hasMoreData;
                },
                () => { this.hasError = true }
            )
    }

    showProfil(friendId: string) {
        this.router.navigate(['/chat/profil', friendId]);
    }

    getMore() {
        this.page++;

        this.friendService.findNewFriendsLike(this.searcher, this.page, this.limit)
            .subscribe(
                (data: any) => {
                    this.friends = this.friends.concat(data.friends);
                    this.hasMoreData = data.hasMoreData;
                },
                () => { this.hasError = true }
            )
    }

    setDefaults() {
        this.friends = [];
        this.page = 1;
        this.limit = 5;
        this.hasError = false;
        this.hasMoreData = false;
    }
}
