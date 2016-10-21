
//angular dependencies
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';


//custom module dependencies
import {DashBoardComponent} from './components/dashboard/dashboard-component';

//import the custom modules created
import {FormComponent} from './components/form-component/form-component';
import {HomeComponent} from './components/home/home-component';
import {WidgetComponent} from './components/widgets/widget-component';


//router configuration
import {DashboardRoutes} from './routing/app.routing';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(DashboardRoutes) ],  //include angular dependencies to imports
  declarations: [ DashBoardComponent,HomeComponent,WidgetComponent ],  //include custom module to declarations
  bootstrap:    [ DashBoardComponent ],   //include the module which will start the application
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppModule { }
