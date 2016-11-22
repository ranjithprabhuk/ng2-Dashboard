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
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var crisis_service_1 = require('./crisis.service');
var crisis_center_component_1 = require('./crisis-center.component');
var crisis_list_component_1 = require('./crisis-list.component');
var crisis_center_home_component_1 = require('./crisis-center-home.component');
var crisis_detail_component_1 = require('./crisis-detail.component');
var crisis_center_routing_module_1 = require('./crisis-center-routing.module');
var CrisisCenterModule = (function () {
    function CrisisCenterModule() {
    }
    CrisisCenterModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                crisis_center_routing_module_1.CrisisCenterRoutingModule
            ],
            declarations: [
                crisis_center_component_1.CrisisCenterComponent,
                crisis_list_component_1.CrisisListComponent,
                crisis_center_home_component_1.CrisisCenterHomeComponent,
                crisis_detail_component_1.CrisisDetailComponent
            ],
            providers: [
                crisis_service_1.CrisisService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CrisisCenterModule);
    return CrisisCenterModule;
}());
exports.CrisisCenterModule = CrisisCenterModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-center.module.js.map