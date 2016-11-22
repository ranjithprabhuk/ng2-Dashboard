import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ApiService } from '../../services/api.service';

import { ChartsModule } from 'ng2-charts/ng2-charts';


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

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    DashboardRoutingModule
  ],
  declarations: [
    HeaderComponent, SidebarComponent, RightSidebarComponent, FooterComponent, DashBoardComponent, HomeComponent,
    WidgetComponent, FormEditorsComponent, FormAdvancedComponent, FormGeneralComponent,MailBoxComponent, ComposeMailComponent,
    ReadMailComponent, InboxComponent, Ng2ChartComponent
  ],
  providers:[ApiService]
})
export class DashboardModule {
  
}