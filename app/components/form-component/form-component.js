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
var core_1 = require("@angular/core");
var form_model_1 = require("./form-model");
//import the services
var app_services_1 = require('./../../services/app.services');
var FormComponent = (function () {
    function FormComponent(employeeServices) {
        this.employeeServices = employeeServices;
        this.sportsList = ["Chess", "Football", "Basketball", "Cricket"];
        this.formValues = new form_model_1.FormData('', '', '', '');
        this.employeeDetails = [];
        this.employeeDataa = [];
    }
    /**
     * get the employee details
     */
    FormComponent.prototype.getEmployee = function () {
        //this.employeeServices.getEmployee().subscribe(data =>{console.log("data>>",data);this.employeeDetails =data;},err=>err);
        //console.log("after request>>",this.employeeDataa.subscribe);
    };
    /**
     * add a new employee
     */
    FormComponent.prototype.addEmployee = function (data) {
        console.log("am coming in>>", data);
        this.employeeDetails.push(new form_model_1.FormData(data.name, data.email, data.designation, data.sports));
    };
    /**
     * edit an employee
     */
    FormComponent.prototype.editEmployee = function (index) {
        this.formValues = this.employeeDetails[index];
    };
    /**
     * delete an employee
     */
    FormComponent.prototype.deleteEmployee = function (index) {
        this.employeeDetails.splice(index, 1);
    };
    //on load call the methods
    FormComponent.prototype.ngOnInit = function () {
        this.getEmployee();
    };
    FormComponent = __decorate([
        core_1.Component({
            selector: 'simple-form',
            templateUrl: 'app/components/form-component/views/form-template.html',
            providers: [app_services_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [app_services_1.EmployeeService])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form-component.js.map