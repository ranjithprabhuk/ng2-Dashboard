/*************************************************************
    Author      : Ranjithprabhu K
    Date Created: 15 Nov 2016
    Description : Authentication Module Base
    
    Change Log
	----------------------------------------------------------
    s.no      date    author     description     
    

***************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//decalrations
import { LoginComponent } from './components/login/login-component';


//Module imports and declarations
@NgModule({
    declarations: [ LoginComponent ],
    exports:[LoginComponent]
})

export class AuthenticationModule {

}