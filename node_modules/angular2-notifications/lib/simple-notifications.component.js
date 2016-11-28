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
var notifications_service_1 = require('./notifications.service');
var SimpleNotificationsComponent = (function () {
    function SimpleNotificationsComponent(_service) {
        this._service = _service;
        this.onCreate = new core_1.EventEmitter();
        this.onDestroy = new core_1.EventEmitter();
        this.notifications = [];
        this.position = ['bottom', 'right'];
        this.lastOnBottom = true;
        this.maxStack = 8;
        this.preventLastDuplicates = false;
        this.preventDuplicates = false;
        this.timeOut = 0;
        this.maxLength = 0;
        this.clickToClose = true;
        this.showProgressBar = true;
        this.pauseOnHover = true;
        this.theClass = '';
        this.rtl = false;
        this.animate = 'fromRight';
    }
    Object.defineProperty(SimpleNotificationsComponent.prototype, "options", {
        set: function (opt) {
            this.attachChanges(opt);
        },
        enumerable: true,
        configurable: true
    });
    SimpleNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listener = this._service.getChangeEmitter()
            .subscribe(function (item) {
            switch (item.command) {
                case 'cleanAll':
                    _this.notifications = [];
                    break;
                case 'clean':
                    _this.cleanSingle(item.id);
                    break;
                case 'set':
                    if (item.add)
                        _this.add(item.notification);
                    else
                        _this.defaultBehavior(item);
                    break;
                default:
                    _this.defaultBehavior(item);
                    break;
            }
        });
    };
    SimpleNotificationsComponent.prototype.defaultBehavior = function (value) {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.onDestroy.emit(this.buildEmit(value.notification, false));
    };
    SimpleNotificationsComponent.prototype.add = function (item) {
        item.createdOn = new Date();
        var toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
        this.lastNotificationCreated = item;
        if (!toBlock) {
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(0, 1);
                this.notifications.push(item);
            }
            else {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(this.notifications.length - 1, 1);
                this.notifications.splice(0, 0, item);
            }
            this.onCreate.emit(this.buildEmit(item, true));
        }
    };
    SimpleNotificationsComponent.prototype.block = function (item) {
        var toCheck = item.html ? this.checkHtml : this.checkStandard;
        if (this.preventDuplicates && this.notifications.length > 0) {
            for (var i = 0; i < this.notifications.length; i++) {
                if (toCheck(this.notifications[i], item)) {
                    return true;
                }
            }
        }
        if (this.preventLastDuplicates) {
            var comp = void 0;
            if (this.preventLastDuplicates === 'visible' && this.notifications.length > 0) {
                if (this.lastOnBottom) {
                    comp = this.notifications[this.notifications.length - 1];
                }
                else {
                    comp = this.notifications[0];
                }
            }
            else if (this.preventLastDuplicates === 'all' && this.lastNotificationCreated) {
                comp = this.lastNotificationCreated;
            }
            else {
                return false;
            }
            return toCheck(comp, item);
        }
        return false;
    };
    SimpleNotificationsComponent.prototype.checkStandard = function (checker, item) {
        return checker.type === item.type && checker.title === item.title && checker.content === item.content;
    };
    SimpleNotificationsComponent.prototype.checkHtml = function (checker, item) {
        return checker.html ? checker.type === item.type && checker.title === item.title && checker.content === item.content && checker.html === item.html : false;
    };
    SimpleNotificationsComponent.prototype.attachChanges = function (options) {
        var _this = this;
        Object.keys(options).forEach(function (a) {
            if (_this.hasOwnProperty(a)) {
                _this[a] = options[a];
            }
        });
    };
    SimpleNotificationsComponent.prototype.buildEmit = function (notification, to) {
        var toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            icon: notification.icon,
            id: notification.id
        };
        if (notification.html) {
            toEmit.html = notification.html;
        }
        else {
            toEmit.title = notification.title;
            toEmit.content = notification.content;
        }
        if (!to) {
            toEmit.destroyedOn = new Date();
        }
        return toEmit;
    };
    SimpleNotificationsComponent.prototype.cleanSingle = function (id) {
        var indexOfDelete = 0;
        var doDelete = false;
        this.notifications.forEach(function (notification, idx) {
            if (notification.id === id) {
                indexOfDelete = idx;
                doDelete = true;
            }
        });
        if (doDelete) {
            this.notifications.splice(indexOfDelete, 1);
        }
    };
    SimpleNotificationsComponent.prototype.ngOnDestroy = function () {
        if (this.listener) {
            this.listener.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SimpleNotificationsComponent.prototype, "options", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SimpleNotificationsComponent.prototype, "onCreate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SimpleNotificationsComponent.prototype, "onDestroy", void 0);
    SimpleNotificationsComponent = __decorate([
        core_1.Component({
            selector: 'simple-notifications',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n        <div class=\"simple-notification-wrapper\" [ngClass]=\"position\">\n            <simple-notification\n                *ngFor=\"let a of notifications; let i = index\"\n                [item]=\"a\"\n                [timeOut]=\"timeOut\"\n                [clickToClose]=\"clickToClose\"\n                [maxLength]=\"maxLength\"\n                [showProgressBar]=\"showProgressBar\"\n                [pauseOnHover]=\"pauseOnHover\"\n                [theClass]=\"theClass\"\n                [rtl]=\"rtl\"\n                [animate]=\"animate\"\n                [position]=\"i\"\n                >\n            </simple-notification>\n        </div>\n    ",
            styles: ["\n        .simple-notification-wrapper {\n            position: fixed;\n            width: 300px;\n            z-index: 1000;\n        }\n        \n        .simple-notification-wrapper.left { left: 20px; }\n        .simple-notification-wrapper.top { top: 20px; }\n        .simple-notification-wrapper.right { right: 20px; }\n        .simple-notification-wrapper.bottom { bottom: 20px; }\n        \n        @media (max-width: 340px) {\n            .simple-notification-wrapper {\n                width: auto;\n                left: 20px;\n                right: 20px;\n            }\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
    ], SimpleNotificationsComponent);
    return SimpleNotificationsComponent;
}());
exports.SimpleNotificationsComponent = SimpleNotificationsComponent;
//# sourceMappingURL=simple-notifications.component.js.map