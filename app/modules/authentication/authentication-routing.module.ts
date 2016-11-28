import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

import { LoginComponent }    from './components/login.component';

const AuthenticationRoutes: Routes = [
  { path: 'login',  component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(AuthenticationRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers:[AuthGuard,AuthenticationService]
})
export class AuthenticationRoutingModule { }