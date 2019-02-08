import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './../shared/services/auth-guard.service';
import { ChatRoutingModule } from './chat.routing';

import { ConversationComponent } from './conversation/conversation.component';
import { RootComponent } from './root/root.component';
import { UserComponent } from './user/user.component';
import { ProfilComponent } from './profil/profil.component';
import { InvitationComponent } from './invitation/invitation.component';
import { SearcherComponent } from './searcher/searcher.component';
import { AdminComponent } from './../admin/admin.component';

import { FriendService } from './shared/services/friend.service';
import { PostService } from './shared/services/post.service';
import { MessageService } from './shared/services/message.service';

@NgModule({
  declarations: [
    ConversationComponent,
    RootComponent,
    UserComponent,
    ProfilComponent,
    InvitationComponent,
    SearcherComponent,
    AdminComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChatRoutingModule
  ],
  exports: [
    FormsModule,
    RootComponent
  ],
  providers: [
    FriendService,
    PostService,
    MessageService
  ]
})
export class ChatModule { }
