/*************************************************************
    Author      : Ranjithprabhu K
    Date Created: 15 Nov 2016
    Description : Authentication module routing is configured here
    
    Change Log
	----------------------------------------------------------
    s.no      date    author     description     
    

***************************************************************/

import { NgModule } from '@angular/core';
import { RouterModule, RouterConfig } from '@angular/router';

//declaration components
import { LoginComponent } from './components/login/login-component';

const AuthenticationRoutes: RouterConfig = [
    {path:'login',component:LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(AuthenticationRoutes)],
    exports: [RouterModule]
})

export class AuthenticationRouting { }