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
var ng2_toasty_1 = require('ng2-toasty');
var ToastyComponent = (function () {
    function ToastyComponent(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig. 
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'material';
    }
    ToastyComponent.prototype.addToast = function () {
        // Just add default Toast with title only
        this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: function (toast) {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.info(toastOptions);
        this.toastyService.success(toastOptions);
        this.toastyService.wait(toastOptions);
        this.toastyService.error(toastOptions);
        this.toastyService.warning(toastOptions);
    };
    ToastyComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/modules/dashboard/components/notifications/view/toasty.html'
        }), 
        __metadata('design:paramtypes', [ng2_toasty_1.ToastyService, ng2_toasty_1.ToastyConfig])
    ], ToastyComponent);
    return ToastyComponent;
}());
exports.ToastyComponent = ToastyComponent;
//# sourceMappingURL=ng2-toasty.component.js.map