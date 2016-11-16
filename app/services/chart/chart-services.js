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
var http_1 = require('@angular/http');
var Rx_1 = require('Rxjs/Rx');
var app_config_1 = require('../../app.config');
var Ng2ChartService = (function () {
    function Ng2ChartService(http) {
        this.http = http;
    }
    Ng2ChartService.prototype.getLineChartData = function (path) {
        return this.http.get(app_config_1.AppConfig.apiBase + path).map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err); });
    };
    Ng2ChartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Ng2ChartService);
    return Ng2ChartService;
}());
exports.Ng2ChartService = Ng2ChartService;
//# sourceMappingURL=chart-services.js.map