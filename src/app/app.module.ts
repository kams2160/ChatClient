import 'rxjs/Rx'

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { ChatModule } from './chat/chat.module';

import { LoginService } from './login/shared/login.service';
import { HeadersService } from './shared/services/headers.service';
import { StorageService } from './shared/services/storage.service';
import { AuthGuard } from './shared/services/auth-guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ChatModule
  ],
  providers: [
    LoginService,
    HeadersService,
    StorageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
