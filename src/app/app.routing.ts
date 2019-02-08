import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/services/auth-guard.service';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: 'chat',
        loadChildren: 'app/chat/chat.module#ChatModule',
        canLoad: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
    LoginComponent
];