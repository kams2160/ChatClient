import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootComponent } from './root/root.component';
import { ConversationComponent } from './conversation/conversation.component';
import { UserComponent } from './user/user.component';
import { ProfilComponent } from './profil/profil.component';
import { InvitationComponent } from './invitation/invitation.component';
import { SearcherComponent } from './searcher/searcher.component';
import { AdminComponent } from './../admin/admin.component';

import { AuthGuard } from './../shared/services/auth-guard.service';

const chatRoutes: Routes = [
  {
    path: 'chat',
    component: RootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'conversation', component: ConversationComponent },
          { path: 'user', component: UserComponent },
          { path: 'profil/:id', component: ProfilComponent },
          { path: 'profil', component: ProfilComponent },
          { path: 'admin', component: AdminComponent },
          { path: 'invitation', component: InvitationComponent },
          { path: 'searcher/:searcher', component: SearcherComponent },
          { path: '', redirectTo: 'profil', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chatRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule {}