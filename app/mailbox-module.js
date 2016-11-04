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
var compose_mail_component_1 = require('./components/mailbox/compose-mail-component');
var read_mail_component_1 = require('./components/mailbox/read-mail-component');
var mailbox_component_1 = require('./components/mailbox/mailbox-component');
var inbox_component_1 = require('./components/mailbox/inbox-component');
var MailBoxRoutingModule = (function () {
    function MailBoxRoutingModule() {
    }
    MailBoxRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: 'mailbox',
                        component: mailbox_component_1.MailBoxComponent,
                        children: [
                            {
                                path: '',
                                component: read_mail_component_1.ReadMailComponent
                            },
                            {
                                path: 'inbox',
                                component: inbox_component_1.InboxComponent
                            },
                            {
                                path: 'compose',
                                component: compose_mail_component_1.ComposeMailComponent
                            }
                        ]
                    }
                ])
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [compose_mail_component_1.ComposeMailComponent, read_mail_component_1.ReadMailComponent, mailbox_component_1.MailBoxComponent, inbox_component_1.InboxComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], MailBoxRoutingModule);
    return MailBoxRoutingModule;
}());
exports.MailBoxRoutingModule = MailBoxRoutingModule;
//# sourceMappingURL=mailbox-module.js.map