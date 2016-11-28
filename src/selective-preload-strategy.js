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
require('rxjs/add/observable/of');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var PreloadSelectedModules = (function () {
    function PreloadSelectedModules() {
        this.preloadedModules = [];
    }
    PreloadSelectedModules.prototype.preload = function (route, load) {
        if (route.data && route.data['preload']) {
            // add the route path to our preloaded module array
            this.preloadedModules.push(route.path);
            // log the route path to the console
            console.log('Preloaded: ' + route.path);
            return load();
        }
        else {
            return Observable_1.Observable.of(null);
        }
    };
    PreloadSelectedModules = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PreloadSelectedModules);
    return PreloadSelectedModules;
}());
exports.PreloadSelectedModules = PreloadSelectedModules;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=selective-preload-strategy.js.map