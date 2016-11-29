import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ApiService } from '../../services/api.service';
import { AppConfig } from '../../config/app.config';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { Ng2TableModule } from 'ng2-table';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HeaderComponent } from './components/dashboard/header.component';
import { SidebarComponent } from './components/dashboard/sidebar.component';
import { RightSidebarComponent } from './components/dashboard/right-sidebar.component';
import { FooterComponent } from './components/dashboard/footer.component';
import { DashBoardComponent }    from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { WidgetComponent} from './components/widgets/widget.component';
import { FormEditorsComponent } from './components/forms/form-editors.component';
import { FormAdvancedComponent } from './components/forms/form-advanced.component';
import { FormGeneralComponent } from './components/forms/form-general.component';
import { ComposeMailComponent } from './components/mailbox/compose-mail.component';
import { ReadMailComponent } from './components/mailbox/read-mail.component';
import { MailBoxComponent } from './components/mailbox/mailbox.component';
import { InboxComponent } from './components/mailbox/inbox.component';
import { Ng2ChartComponent } from './components/chart/ng2-chart.component';
import { SimpleNotificationComponent } from './components/notifications/notification.component';
import { ToastyComponent } from './components/notifications/ng2-toasty.component';
import { GoogleMapComponent } from './components/maps/google-map.component';
import { GoogleChartComponent } from './components/chart/ng2-google-chart.component';

import { Ng2DataTableComponent } from './components/table/ng2-table.component';
import { DragAndDropComponent } from './components/drag&drop/drag-and-drop.component';


import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: new AppConfig().googleMapApiKey
    }),
    Ng2GoogleChartsModule,
    Ng2TableModule,
    PaginationModule,
    TabsModule,
    DragulaModule,
    SimpleNotificationsModule,
    DashboardRoutingModule
  ],
  declarations: [
    HeaderComponent, SidebarComponent, RightSidebarComponent, FooterComponent, DashBoardComponent, HomeComponent,
    WidgetComponent, FormEditorsComponent, FormAdvancedComponent, FormGeneralComponent,MailBoxComponent, ComposeMailComponent,
    ReadMailComponent, InboxComponent, Ng2ChartComponent, SimpleNotificationComponent, GoogleMapComponent, GoogleChartComponent,
    Ng2DataTableComponent, DragAndDropComponent
  ],
  providers:[ApiService]
})
export class DashboardModule {
  
}