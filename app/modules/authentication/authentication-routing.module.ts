import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  ]
})
export class AuthenticationRoutingModule { }