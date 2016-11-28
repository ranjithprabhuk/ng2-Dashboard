"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var api_service_1 = require('../../services/api.service');
var app_config_1 = require('../../config/app.config');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var angular2_notifications_1 = require('angular2-notifications');
var angular2_google_maps_1 = require('angular2-google-maps');
var header_component_1 = require('./components/dashboard/header.component');
var sidebar_component_1 = require('./components/dashboard/sidebar.component');
var right_sidebar_component_1 = require('./components/dashboard/right-sidebar.component');
var footer_component_1 = require('./components/dashboard/footer.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var home_component_1 = require('./components/home/home.component');
var widget_component_1 = require('./components/widgets/widget.component');
var form_editors_component_1 = require('./components/forms/form-editors.component');
var form_advanced_component_1 = require('./components/forms/form-advanced.component');
var form_general_component_1 = require('./components/forms/form-general.component');
var compose_mail_component_1 = require('./components/mailbox/compose-mail.component');
var read_mail_component_1 = require('./components/mailbox/read-mail.component');
var mailbox_component_1 = require('./components/mailbox/mailbox.component');
var inbox_component_1 = require('./components/mailbox/inbox.component');
var ng2_chart_component_1 = require('./components/chart/ng2-chart.component');
var notification_component_1 = require('./components/notifications/notification.component');
var google_map_component_1 = require('./components/maps/google-map.component');
var dashboard_routing_module_1 = require('./dashboard-routing.module');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_charts_1.ChartsModule,
                angular2_google_maps_1.AgmCoreModule.forRoot({
                    apiKey: new app_config_1.AppConfig().googleMapApiKey
                }),
                angular2_notifications_1.SimpleNotificationsModule,
                dashboard_routing_module_1.DashboardRoutingModule
            ],
            declarations: [
                header_component_1.HeaderComponent, sidebar_component_1.SidebarComponent, right_sidebar_component_1.RightSidebarComponent, footer_component_1.FooterComponent, dashboard_component_1.DashBoardComponent, home_component_1.HomeComponent,
                widget_component_1.WidgetComponent, form_editors_component_1.FormEditorsComponent, form_advanced_component_1.FormAdvancedComponent, form_general_component_1.FormGeneralComponent, mailbox_component_1.MailBoxComponent, compose_mail_component_1.ComposeMailComponent,
                read_mail_component_1.ReadMailComponent, inbox_component_1.InboxComponent, ng2_chart_component_1.Ng2ChartComponent, notification_component_1.SimpleNotificationComponent, google_map_component_1.GoogleMapComponent
            ],
            providers: [api_service_1.ApiService]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map