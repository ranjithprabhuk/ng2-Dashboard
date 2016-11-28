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
var angular2_notifications_1 = require('angular2-notifications');
var notification_config_1 = require('../../../../config/notification.config');
var SimpleNotificationComponent = (function () {
    function SimpleNotificationComponent(_notificationsService, options) {
        this._notificationsService = _notificationsService;
        this.options = options;
        //initial values
        this.title = 'Title';
        this.content = 'Some Content';
    }
    //method to display the alert based on the alert type requested by the user
    SimpleNotificationComponent.prototype.showAlert = function (type) {
        switch (type) {
            case 'success':
                this._notificationsService.success(this.title, this.content, this.options);
                break;
            case 'info':
                this._notificationsService.info(this.title, this.content, this.options);
                break;
            case 'alert':
                this._notificationsService.alert(this.title, this.content, this.options);
                break;
            case 'error':
                this._notificationsService.error(this.title, this.content, this.options);
                break;
            case 'bare':
                this._notificationsService.bare(this.title, this.content, this.options);
                break;
            case 'html':
                this._notificationsService.html(this.title, this.content, this.options);
                break;
            default: break;
        }
    };
    //method to display the alert
    SimpleNotificationComponent.prototype.clearAlert = function () {
        this._notificationsService.remove();
    };
    SimpleNotificationComponent = __decorate([
        core_1.Component({
            selector: 'notification',
            templateUrl: 'app/modules/dashboard/components/notifications/view/simple-notification.html',
            providers: [angular2_notifications_1.NotificationsService, notification_config_1.NotificationConfig]
        }), 
        __metadata('design:paramtypes', [angular2_notifications_1.NotificationsService, notification_config_1.NotificationConfig])
    ], SimpleNotificationComponent);
    return SimpleNotificationComponent;
}());
exports.SimpleNotificationComponent = SimpleNotificationComponent;
//# sourceMappingURL=notification.component.js.map