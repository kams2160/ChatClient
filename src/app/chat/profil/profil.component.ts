import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FriendService } from './../shared/services/friend.service';
import { LoginService } from './../../login/shared/login.service';
import { PostService } from './../shared/services/post.service';

import { User } from './../../login/shared/user.model';
import { Post } from './../shared/models/post.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  posts: Post[];
  friends: User[];
  messageContent: string;
  profilId: string;
  profil: User;
  postSending: boolean;
  dataLoading: boolean;
  isLoggedUserProfile: boolean;
  page: number;
  limit: number;
  hasMoreData: boolean;
  invitationError: boolean;
  invitationSuccess: boolean;
  removeError: boolean;
  removeSuccess: boolean;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public friendService: FriendService,
    public loginService: LoginService,
    public postService: PostService) {
    this.posts = [];
    this.page = 1;
    this.limit = 5;
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.setDefaults();
        this.profilId = params['id'] || this.loginService.userId;
        return this.friendService.getFriendProfil(this.profilId);
      })
      .do((profil: User) => {
        this.profil = profil;
        this.friendService.getFriends(this.profilId)
          .subscribe((friends: User[]) => this.friends = friends, () => { })
      })
      .subscribe(() => {
        this.isLoggedUserProfile = this.loginService.userId === this.profilId;
        this.getPosts();
      }, () => { });
  }

  getPosts() {
    this.dataLoading = true;

    this.postService.getPostsFromUser(this.profilId, this.page, this.limit)
      .subscribe((data: any) => {
        this.posts = this.posts.concat(data.posts);
        this.hasMoreData = data.hasMoreData;
        this.dataLoading = false;
      });
  }

  getMorePosts() {
    this.page++;

    this.getPosts();
  }

  addPost() {
    if (this.messageContent) {
      this.postSending = true;

      let post: Post = {
        authorId: this.loginService.userId,
        userId: this.profilId,
        content: this.messageContent
      }

      this.postService.addPost(post)
        .subscribe((addedPost: Post) => {
          this.postSending = false;
          this.messageContent = '';
          this.posts.unshift(addedPost);
        }, () => {
          this.postSending = false;
        })
    }
  }

  addToFriends() {
    this.invitationSuccess = false;
    this.invitationError = false;

    this.friendService.addToFriends(this.loginService.userId, this.profilId)
      .subscribe(() => this.invitationSuccess = true, () => this.invitationError = true)
  }

  removeFromFriends() {
    this.removeSuccess = false;
    this.removeError = false;

    this.friendService.removeFromFriends(this.profilId)
      .subscribe(() => this.removeSuccess = true, () => this.removeError = true)
  }

  showProfil(friendId: string) {
    this.router.navigate(['/chat/profil', friendId]);
  }

  setDefaults() {
    this.removeSuccess = false;
    this.removeError = false;
    this.invitationSuccess = false;
    this.invitationError = false;
    this.posts = [];
    this.page = 1;
    this.limit = 5;
  }
}
