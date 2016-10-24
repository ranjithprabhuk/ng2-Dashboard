
//angular dependencies
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,RouterConfig } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

//import the application routing module
import { DashboardRoutingModule } from './routing/app.routing';

//custom module dependencies
import {DashBoardComponent} from './components/dashboard/dashboard-component';

//Module Imports and Declarations
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, DashboardRoutingModule ],  //include angular dependencies to imports
  declarations: [ DashBoardComponent],  //include custom module to declarations
  bootstrap:    [ DashBoardComponent ]//,   //include the module which will start the application
 // providers:    [{provide: APP_BASE_HREF, useValue : '/' }]  //define the base hyperlink reference of the application
})

export class AppModule { }
