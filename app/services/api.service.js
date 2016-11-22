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
var app_config_1 = require('../config/app.config');
require('rxjs/add/operator/toPromise');
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.apiBase = new app_config_1.AppConfig().apiBase;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //for all GET operations
    ApiService.prototype.get = function (module, parameter) {
        return this.http
            .get(this.apiBase + module, { search: parameter, headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //for all POST operations
    ApiService.prototype.create = function (module, parameter) {
        return this.http
            .post(this.apiBase + module, JSON.stringify(parameter), this.headers)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    //for all UPDATE operations
    ApiService.prototype.update = function (module, parameter) {
        return this.http
            .put(this.apiBase + module, JSON.stringify(parameter), this.headers)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    //for all DELETE operations
    ApiService.prototype.delete = function (module, parameter) {
        return this.http.delete(this.apiBase + module + parameter, this.headers)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    //for error handling
    ApiService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map