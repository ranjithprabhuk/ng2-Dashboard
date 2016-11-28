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
var Observable_1 = require('rxjs/Observable');
var PushNotificationsService = (function () {
    function PushNotificationsService() {
        this.permission = this.isSupported() ? Notification.permission : 'denied';
    }
    PushNotificationsService.prototype.requestPermission = function () {
        var _this = this;
        if ('Notification' in window)
            Notification.requestPermission(function (status) { return _this.permission = status; });
    };
    PushNotificationsService.prototype.isSupported = function () {
        return 'Notification' in window;
    };
    PushNotificationsService.prototype.create = function (title, options) {
        var _this = this;
        return new Observable_1.Observable(function (obs) {
            if (!('Notification' in window)) {
                obs.error('Notifications are not available in this environment');
                obs.complete();
            }
            if (_this.permission !== 'granted') {
                obs.error("The user hasn't granted you permission to send push notifications");
                obs.complete();
            }
            var n = new Notification(title, options);
            n.onshow = function (e) { return obs.next({ notification: n, event: e }); };
            n.onclick = function (e) { return obs.next({ notification: n, event: e }); };
            n.onerror = function (e) { return obs.error({ notification: n, event: e }); };
            n.onclose = function () { return obs.complete(); };
        });
    };
    PushNotificationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PushNotificationsService);
    return PushNotificationsService;
}());
exports.PushNotificationsService = PushNotificationsService;
//# sourceMappingURL=push-notifications.service.js.map