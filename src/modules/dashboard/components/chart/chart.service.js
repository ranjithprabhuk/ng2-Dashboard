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
var api_service_1 = require('../../../../services/api.service');
require('rxjs/add/operator/toPromise');
var ChartService = (function () {
    function ChartService(apiService) {
        this.apiService = apiService;
        this.module = "chart/";
    }
    //to get the chart data
    ChartService.prototype.getChartData = function (endPoint, parameter) {
        var params = new http_1.URLSearchParams();
        return this.apiService.get(this.module + endPoint, params)
            .then(function (res) { return res; })
            .catch(function (err) { return err; });
    };
    ChartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService])
    ], ChartService);
    return ChartService;
}());
exports.ChartService = ChartService;
//# sourceMappingURL=chart.service.js.map