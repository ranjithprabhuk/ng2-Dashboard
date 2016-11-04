
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

//define the application routing configuration such as path and component
const DashboardRoutes:RouterConfig = [
    {path:'',redirectTo:'/home',pathMatch:'full'},  //default page load configuaration goes here
    {path:'home',component: HomeComponent},
    {path:'widgets',component: WidgetComponent},
    {path:'calendar',component: CalendarComponent},
    {
        path: 'mailbox',
        component: MailBoxComponent,
        children: [
              {path:'',redirectTo:'/mailbox/inbox',pathMatch:'full'},
              {
                path: 'inbox',
                component: InboxComponent
              },
              {
                path: 'compose',
                component: ComposeMailComponent
              }
        ]
      },
    {path:'form-editors',component: FormEditorsComponent},
    {path:'form-advanced',component: FormAdvancedComponent},
    {path:'form-general',component: FormGeneralComponent},    
    {path:'**',component:HomeComponent} //if path not found, default HomeComponent will be loaded
];

//Module Imports and Declarations
@NgModule({
  imports:      [ RouterModule.forRoot(DashboardRoutes)],  //include angular dependencies to imports
  declarations: [ HomeComponent,WidgetComponent,CalendarComponent,FormEditorsComponent,FormAdvancedComponent,
                    FormGeneralComponent],
  exports:      [ RouterModule]
})

export class DashboardRoutingModule { }
