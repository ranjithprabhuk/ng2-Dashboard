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
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var home_component_1 = require('./components/home/home.component');
var widget_component_1 = require('./components/widgets/widget.component');
var form_editors_component_1 = require('./components/forms/form-editors.component');
var form_advanced_component_1 = require('./components/forms/form-advanced.component');
var form_general_component_1 = require('./components/forms/form-general.component');
var compose_mail_component_1 = require('./components/mailbox/compose-mail.component');
var mailbox_component_1 = require('./components/mailbox/mailbox.component');
var inbox_component_1 = require('./components/mailbox/inbox.component');
var ng2_chart_component_1 = require('./components/chart/ng2-chart.component');
var DashboardRoutes = [
    {
        path: 'dashboard', component: dashboard_component_1.DashBoardComponent,
        children: [
            { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
            { path: 'home', component: home_component_1.HomeComponent },
            { path: 'widgets', component: widget_component_1.WidgetComponent },
            {
                path: 'mailbox',
                component: mailbox_component_1.MailBoxComponent,
                children: [
                    { path: '', redirectTo: '/dashboard/mailbox/inbox', pathMatch: 'full' },
                    {
                        path: 'inbox',
                        component: inbox_component_1.InboxComponent
                    },
                    {
                        path: 'compose',
                        component: compose_mail_component_1.ComposeMailComponent
                    }
                ]
            },
            { path: 'ng2-charts', component: ng2_chart_component_1.Ng2ChartComponent },
            { path: 'form-editors', component: form_editors_component_1.FormEditorsComponent },
            { path: 'form-advanced', component: form_advanced_component_1.FormAdvancedComponent },
            { path: 'form-general', component: form_general_component_1.FormGeneralComponent },
            { path: '**', component: home_component_1.HomeComponent } //if path not found, default HomeComponent will be loaded
        ]
    },
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(DashboardRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());
exports.DashboardRoutingModule = DashboardRoutingModule;
//# sourceMappingURL=dashboard-routing.module.js.map