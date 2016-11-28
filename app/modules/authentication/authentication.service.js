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
var api_service_1 = require('../../services/api.service');
require('rxjs/add/observable/of');
require('rxjs/add/operator/do');
require('rxjs/add/operator/delay');
var AuthenticationService = (function () {
    function AuthenticationService(apiService) {
        this.apiService = apiService;
        this.authEndPoint = "authentication/signIn.json";
    }
    //to check the login credentials
    AuthenticationService.prototype.login = function (parameter) {
        return this.apiService.get(this.authEndPoint)
            .then(function (res) {
            if (res) {
                localStorage.setItem('auth_token', res.auth_token);
                return res;
            }
        }).catch(function (err) { return err; });
    };
    //to logou from the system
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
    };
    //to check the login status
    AuthenticationService.prototype.checkLogin = function () {
        return !!localStorage.getItem('auth_token');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map