import {Component} from "@angular/core";
import {FormData} from "./form-model";

//import the services
import {EmployeeService} from './../../services/app.services';

@Component({
    selector: 'simple-form',
    templateUrl: 'app/components/form-component/views/form-template.html',
    providers:[EmployeeService]
})

export class FormComponent {
   public sportsList:any = ["Chess","Football","Basketball","Cricket"];
   public formValues = new FormData('','','','');
   public employeeDetails:any= [];
   public employeeDataa:any = [];

   constructor(private employeeServices:EmployeeService){}


   /**
    * get the employee details
    */
   public getEmployee() {
         //this.employeeServices.getEmployee().subscribe(data =>{console.log("data>>",data);this.employeeDetails =data;},err=>err);
       //console.log("after request>>",this.employeeDataa.subscribe);
   }

   /**
    * add a new employee
    */
   public addEmployee(data) {
       console.log("am coming in>>",data);
       this.employeeDetails.push(new FormData(data.name,data.email,data.designation,data.sports));
   }

   /**
    * edit an employee
    */
   public editEmployee(index:number) {
        this.formValues = this.employeeDetails[index];
   }

   /**
    * delete an employee
    */
   public deleteEmployee(index:number) {
       this.employeeDetails.splice(index,1);
   }


   //on load call the methods
   ngOnInit(){
       this.getEmployee();
   }

}