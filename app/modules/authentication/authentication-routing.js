/*************************************************************
    Author      : Ranjithprabhu K
    Date Created: 15 Nov 2016
    Description : Authentication module routing is configured here
    
    Change Log
    ----------------------------------------------------------
    s.no      date    author     description
    

***************************************************************/
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
//declaration components
var login_component_1 = require('./components/login/login-component');
var AuthenticationRoutes = [
    { path: 'login', component: login_component_1.LoginComponent }
];
var AuthenticationRouting = (function () {
    function AuthenticationRouting() {
    }
    AuthenticationRouting = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(AuthenticationRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthenticationRouting);
    return AuthenticationRouting;
}());
exports.AuthenticationRouting = AuthenticationRouting;
//# sourceMappingURL=authentication-routing.js.map