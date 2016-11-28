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
var angular2_notifications_1 = require('angular2-notifications');
var authentication_service_1 = require('../authentication.service');
var LoginComponent = (function () {
    function LoginComponent(authService, router, _notificationsService) {
        this.authService = authService;
        this.router = router;
        this._notificationsService = _notificationsService;
        this.userDetails = {};
        this.isRemember = true;
        this.options = {
            position: ["bottom", "left"],
            timeOut: 5000,
            lastOnBottom: true
        };
    }
    //method to handle the sigin in
    LoginComponent.prototype.signIn = function (data) {
        var _this = this;
        if (data && data.username && data.password) {
            //call the authService to chekc the credentials
            this.authService.login(data).then(function (res) {
                //set isLogin as true
                //this.authService.isLoggedIn = true;
                console.log("response>>", res);
                //console.log("status>>",this.authService.isLoggedIn);
                _this.router.navigate(['/dashboard']);
            }).catch(function (err) { return err; });
        }
    };
    LoginComponent.prototype.ShowAlert = function () {
        this._notificationsService.success('Some Title', 'Some Content', {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/modules/authentication/components/view/login.html',
            providers: [authentication_service_1.AuthenticationService, angular2_notifications_1.NotificationsService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router, angular2_notifications_1.NotificationsService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map