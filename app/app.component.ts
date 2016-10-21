import { Component } from '@angular/core';

declare var $: any

import {Skills} from './hero';
@Component({
  selector: 'my-app',
  templateUrl:'app/views/home.html'
})
export class AppComponent { 
    title:string = 'Ranjith';
    panelTitle :string = 'Panel Heading';
    public i:number;
    public skills = [];
   // skills= ['html','css','javascript'];

  /**
   * on click of the load
   */
  public init(e:MouseEvent) {
      console.log("Jquery>>",$(this));
      //empty the array
      this.skills= [];
       for(this.i=0;this.i<5;this.i++){
           this.skills.push(new Skills(this.i,"HTML"));
       }

       //this.title += JSON.stringify(<HTMLInputElement>e.target);
       console.log(e.target);
  } 

  /**
   * changeTitle
   */
  public changeTitle(value:string) {
      
      console.log("Jquery>>",$(this));
      console.log(value);
      if(value!='')
        this.panelTitle = value;
      else
        this.panelTitle = 'Enter some value in Text Box';
  }

  //add a new skill to the list
  public addSkill(skillName:string){
      this.skills.push(new Skills(5,skillName));
  }
   
   
  // init:function()
}

//AppComponent.prototype.init();
