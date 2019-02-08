import { User } from './../login/shared/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LoginService } from './../login/shared/login.service';
import { FriendService } from './../chat/shared/services/friend.service';
import { PostService } from './../chat/shared/services/post.service';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {
    isAdmin: boolean;
    users: User[];
    page: number;
    limit: number;
    hasMoreData: boolean;

    constructor(
        public loginService: LoginService,
        public router: Router,
        public friendService: FriendService,
        public postService: PostService
    ) {
        if (!this.loginService.isAdmin) {
            this.router.navigate(['/chat/profil']);
        }

        this.page = 1;
        this.limit = 6;
    }

    ngOnInit() {
        if (this.loginService.isAdmin) {
            this.friendService.getUsers(this.page, this.limit)
                .subscribe((data: any) => {
                    this.users = data.friends;
                    this.hasMoreData = data.hasMoreData;
                }, () => { })
        }
    }

    getMoreUsers() {
        this.page++;

        this.friendService.getUsers(this.page, this.limit)
            .subscribe((data: any) => {
                this.users = this.users.concat(data.friends);
                this.hasMoreData = data.hasMoreData;
            }, () => { })
    }

    blockUser(userId: string, index: number) {
        this.friendService.blockUser(userId)
            .subscribe(() => {
                this.users[index].isBlocked = true;
            }, () => { })
    }

    unblockUser(userId: string, index: number) {
        this.friendService.unblockUser(userId)
            .subscribe(() => {
                this.users[index].isBlocked = false;
            }, () => { })
    }

    removePostsFromUser(userId: string) {
        this.postService.removePostsFromUser(userId)
            .subscribe(() => { }, () => { });
    }
}