// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-toasty
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
__export(require('./src/toasty.service'));
__export(require('./src/toasty.component'));
var toasty_component_2 = require('./src/toasty.component');
var toast_component_1 = require('./src/toast.component');
var toasty_service_2 = require('./src/toasty.service');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    providers: [toasty_service_2.ToastyConfig, toasty_service_2.ToastyService],
    directives: [toasty_component_2.ToastyComponent, toast_component_1.ToastComponent]
};
var ToastyModule = (function () {
    function ToastyModule() {
    }
    ToastyModule.forRoot = function () {
        return {
            ngModule: ToastyModule,
            providers: [toasty_service_2.ToastyConfig, toasty_service_2.ToastyService]
        };
    };
    ToastyModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [toast_component_1.ToastComponent, toasty_component_2.ToastyComponent],
            exports: [toast_component_1.ToastComponent, toasty_component_2.ToastyComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ToastyModule);
    return ToastyModule;
}());
exports.ToastyModule = ToastyModule;
//# sourceMappingURL=index.js.map