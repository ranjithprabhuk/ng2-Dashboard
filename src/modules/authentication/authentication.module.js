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
var angular2_notifications_1 = require('angular2-notifications');
var api_service_1 = require('../../services/api.service');
var login_component_1 = require('./components/login.component');
var authentication_routing_module_1 = require('./authentication-routing.module');
var AuthenticationModule = (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                authentication_routing_module_1.AuthenticationRoutingModule,
                angular2_notifications_1.SimpleNotificationsModule
            ],
            declarations: [
                login_component_1.LoginComponent
            ],
            providers: [api_service_1.ApiService]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthenticationModule);
    return AuthenticationModule;
}());
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map