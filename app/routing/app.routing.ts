
//angular dependencies
import { NgModule }      from '@angular/core';
import { RouterModule,RouterConfig } from '@angular/router';

//import the custom modules created
import { FormComponent } from '../components/form-component/form-component';
import { HomeComponent } from '../components/home/home-component';
import { WidgetComponent } from '../components/widgets/widget-component';
import { CalendarComponent } from '../components/calendar/calendar-component';
import { FormEditorsComponent } from '../components/forms/form-editors-component';
import { FormAdvancedComponent } from '../components/forms/form-advanced-component';
import { FormGeneralComponent } from '../components/forms/form-general-component';
import { ComposeMailComponent } from '../components/mailbox/compose-mail-component';
import { ReadMailComponent } from '../components/mailbox/read-mail-component';
import { MailBoxComponent } from '../components/mailbox/mailbox-component';

import { InboxComponent } from '../components/mailbox/inbox-component';

//define the application routing configuration
export const DashboardRoutes:RouterConfig = [
    {path:'',redirectTo:'/home',pathMatch:'full'},  //default page load configuaration goes here
    {path:'home',component: HomeComponent},
    {path:'widgets',component: WidgetComponent},
    {path:'calendar',component: CalendarComponent},
    {path:'form-editors',component: FormEditorsComponent},
    {path:'form-advanced',component: FormAdvancedComponent},
    {path:'form-general',component: FormGeneralComponent},
    {path:'compose-mail',component: ComposeMailComponent},
    {path:'read-mail',component: ReadMailComponent},
    {path:'mailbox',component: MailBoxComponent,
        children :[
            {path:'',redirectTo:'/inbox',pathMatch:'full'},
            {path:'inbox',component:InboxComponent},
            {path:'compose',component:ComposeMailComponent}
        ]    
    }
   
    
];


//Module Imports and Declarations
@NgModule({
  imports:      [   RouterModule.forRoot(DashboardRoutes)],  //include angular dependencies to imports
  exports:      [ RouterModule]
})

export class DashboardRoutingModule { }
