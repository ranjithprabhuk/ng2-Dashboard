import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { WidgetComponent } from './components/widgets/widget.component';
import { FormEditorsComponent } from './components/forms/form-editors.component';
import { FormAdvancedComponent } from './components/forms/form-advanced.component';
import { FormGeneralComponent } from './components/forms/form-general.component';
import { ComposeMailComponent } from './components/mailbox/compose-mail.component';
import { ReadMailComponent } from './components/mailbox/read-mail.component';
import { MailBoxComponent } from './components/mailbox/mailbox.component';
import { InboxComponent } from './components/mailbox/inbox.component';
import { Ng2ChartComponent } from './components/chart/ng2-chart.component';



const DashboardRoutes: Routes = [
  {
    path: 'dashboard', component: DashBoardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'widgets', component: WidgetComponent },
      {
        path: 'mailbox',
        component: MailBoxComponent,
        children: [
          { path: '', redirectTo: '/dashboard/mailbox/inbox', pathMatch: 'full' },
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
      { path: 'ng2-charts', component: Ng2ChartComponent },
      { path: 'form-editors', component: FormEditorsComponent },
      { path: 'form-advanced', component: FormAdvancedComponent },
      { path: 'form-general', component: FormGeneralComponent },
      { path: '**', component: HomeComponent } //if path not found, default HomeComponent will be loaded
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(DashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutingModule { }