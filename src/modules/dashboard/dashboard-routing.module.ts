import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { AuthGuard } from '../../modules/authentication/auth-guard.service';
//import { PreloadSelectedModules } from '../selective-preload-strategy';

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
import { SimpleNotificationComponent } from './components/notifications/notification.component';
import { GoogleMapComponent } from './components/maps/google-map.component';
import { GoogleChartComponent } from './components/chart/ng2-google-chart.component';

import { Ng2DataTableComponent } from './components/table/ng2-table.component';



const DashboardRoutes: Routes = [
  {
    path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivateChild: [AuthGuard] },
      { path: 'widgets', component: WidgetComponent, canActivateChild: [AuthGuard] },
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
      { path: 'ng2-charts', component: Ng2ChartComponent, canActivateChild: [AuthGuard] },
      { path: 'form-editors', component: FormEditorsComponent, canActivateChild: [AuthGuard] },
      { path: 'form-advanced', component: FormAdvancedComponent },
      { path: 'form-general', component: FormGeneralComponent },
      { path: 'ng2-notifications', component: SimpleNotificationComponent },
      { path: 'google-maps', component: GoogleMapComponent },
      { path: 'google-charts', component: GoogleChartComponent },
      { path: 'ng2-data-table', component: Ng2DataTableComponent },
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