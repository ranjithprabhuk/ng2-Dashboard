import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { ApiService } from '../../services/api.service';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth-guard.service';

import { LoginComponent }    from './components/login.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    SimpleNotificationsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers:[ApiService]
})
export class AuthenticationModule {
  
}