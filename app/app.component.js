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
var hero_1 = require('./hero');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Ranjith';
        this.panelTitle = 'Panel Heading';
        this.skills = [];
    }
    // skills= ['html','css','javascript'];
    /**
     * on click of the load
     */
    AppComponent.prototype.init = function (e) {
        console.log("Jquery>>", $(this));
        //empty the array
        this.skills = [];
        for (this.i = 0; this.i < 5; this.i++) {
            this.skills.push(new hero_1.Skills(this.i, "HTML"));
        }
        //this.title += JSON.stringify(<HTMLInputElement>e.target);
        console.log(e.target);
    };
    /**
     * changeTitle
     */
    AppComponent.prototype.changeTitle = function (value) {
        console.log("Jquery>>", $(this));
        console.log(value);
        if (value != '')
            this.panelTitle = value;
        else
            this.panelTitle = 'Enter some value in Text Box';
    };
    //add a new skill to the list
    AppComponent.prototype.addSkill = function (skillName) {
        this.skills.push(new hero_1.Skills(5, skillName));
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/views/home.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//AppComponent.prototype.init();
//# sourceMappingURL=app.component.js.map