var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var dropdown_1 = require('./dropdown');
var DropdownMenu = (function () {
    function DropdownMenu(dropdown, el) {
        this.dropdown = dropdown;
        this.el = el;
    }
    DropdownMenu.prototype.ngOnInit = function () {
        this.dropdown.dropDownMenu = this;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropdownMenu.prototype, "templateUrl", void 0);
    DropdownMenu = __decorate([
        core_1.Directive({ selector: '[dropdown-menu]' }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [dropdown_1.Dropdown, core_1.ElementRef])
    ], DropdownMenu);
    return DropdownMenu;
})();
exports.DropdownMenu = DropdownMenu;
//# sourceMappingURL=dropdown-menu.js.map