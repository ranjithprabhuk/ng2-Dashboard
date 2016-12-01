import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
    selector: 'home',
    templateUrl: './view/home.html',
    providers: [HomeService]
})

export class HomeComponent {

    public location: any = {};
    public temperature : number = 31;
    public humidity : number = 100;
    public windSpeed : number = 2.1;
    public visibility : number = 14483;
    constructor(public homeService: HomeService) { }

    //get the position from navigator and store it in location
    setPosition(position) {
        //set the co-ordinates to location
        this.location = position.coords;

        //get the weather data based on the position
        this.homeService.getChartData(this.location).then(res => {
            console.log("weater data>>",res);
        }).catch(err =>err);

        console.log(this.location.latitude);
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        };
    }
}