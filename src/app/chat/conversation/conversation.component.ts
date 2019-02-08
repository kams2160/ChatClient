import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { LoginService } from './../../login/shared/login.service';
import { MessageService } from './../shared/services/message.service';
import { FriendService } from './../shared/services/friend.service';

import { Message } from './../shared/models/message.model';
import { User } from './../../login/shared/user.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {
  messages: Message[];
  friends: User[];
  newMessages: Subscription;
  friendId: string;
  lastMessageId: number;
  messageContent: string;
  page: number;
  limit: number;
  hasMoreData: boolean;
  messageSending: boolean;

  constructor(
    public messageService: MessageService,
    public loginService: LoginService,
    public friendService: FriendService
  ) {
    this.messages = [];
    this.page = 1;
    this.limit = 20;
    this.lastMessageId = 0;
  }

  ngOnInit() {
    this.friendService.getFriends(this.loginService.userId)
      .subscribe((friends: User[]) => this.friends = friends, () => { })

    this.getMessages();

    this.newMessages = Observable.timer(2000, 2000)
      .subscribe(() => this.getNewMessages());
  }

  ngOnDestroy() {
    this.newMessages.unsubscribe();
  }

  setFriend(friendId: string) {
    this.newMessages.unsubscribe();
    this.setDefaults();
    this.friendId = friendId;
    this.getMessages();

    this.newMessages = Observable.timer(2000, 2000)
      .subscribe(() => this.getNewMessages());
  }

  addMessage() {
    this.messageSending = true;

    let message: Message = {
      friendId: this.friendId,
      userId: this.loginService.userId,
      content: this.messageContent
    };

    this.messageService.addMesssage(message)
      .subscribe((message: Message) => {
        this.messageContent = '';
        this.messageSending = false;
      }, () => {
        this.messageSending = false;
      });
  }

  getMessages() {
    if (!this.friendId)
      return;

    this.messageService.getMessagesFromUser(this.lastMessageId, this.friendId, this.page, this.limit)
      .subscribe((data: any) => {
        this.messages = data.messages;
        this.hasMoreData = data.hasMoreData;
        this.lastMessageId = this.messages.length > 0 ? this.messages[0].id : 0;
      }, () => { });
  }

  getNewMessages() {
    if (!this.friendId)
      return;

    this.messageService.getMessagesFromUser(this.lastMessageId, this.friendId, 1, this.limit)
      .subscribe((data: any) => {
        this.messages = data.messages.concat(this.messages);
        this.lastMessageId = this.messages.length > 0 ? this.messages[0].id : 0;
      }, () => { });
  }

  getMoreMessages() {
    if (!this.friendId)
      return;

    this.page++;

    this.messageService.getMessagesFromUser(0, this.friendId, this.page, this.limit)
      .subscribe((data: any) => {
        this.messages = this.messages.concat(data.messages);
        this.hasMoreData = data.hasMoreData;
      }, () => { });
  }

  setDefaults() {
    this.page = 1;
    this.limit = 20;
    this.messages = [];
    this.hasMoreData = false;
    this.messageContent = '';
    this.lastMessageId = 0;
  }
}
