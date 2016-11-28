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
var auth_guard_service_1 = require('./auth-guard.service');
var auth_service_1 = require('./auth.service');
var login_component_1 = require('./login.component');
var loginRoutes = [
    { path: 'login', component: login_component_1.LoginComponent }
];
var LoginRoutingModule = (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(loginRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: [
                auth_guard_service_1.AuthGuard,
                auth_service_1.AuthService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());
exports.LoginRoutingModule = LoginRoutingModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=login-routing.module.js.map