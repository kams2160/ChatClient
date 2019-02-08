import { Component, OnInit } from '@angular/core';

import { LoginService } from './../../login/shared/login.service';
import { FriendService } from './../shared/services/friend.service';

import { User } from './../../login/shared/user.model';

@Component({
    selector: 'invitation',
    templateUrl: 'invitation.component.html',
    styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
    friends: User[];
    invitationError: boolean;
    removeError: boolean;

    constructor(
        public loginService: LoginService,
        public friendService: FriendService) { }

    ngOnInit() {
        this.getInvitation();
    }

    removeFriend(friendId) {
        this.setDefaults();
        this.friendService.removeFromFriends(friendId)
            .subscribe(() => {
                this.friendService.invitation--;
                this.getInvitation();
            }, () => this.removeError = true)
    }
    
    acceptFriend(friendId) {
        this.setDefaults();
        this.friendService.acceptFriend(friendId)
            .subscribe(() => {
                this.friendService.invitation--;
                this.getInvitation();
            }, () => this.invitationError = true)
    }

    setDefaults() {
        this.removeError = false;
        this.invitationError = false;
    }

    getInvitation() {
        this.friendService.getInvitation(this.loginService.userId)
            .subscribe((friends: User[]) => this.friends = friends, () => { })
    }
}