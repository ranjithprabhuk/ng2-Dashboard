import {Component} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './view/home.html'
})

export class HomeComponent {
    location = {};
   setPosition(position){
      this.location = position.coords;
      console.log(position.coords);
      }
ngOnInit(){
   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      };
   }
}