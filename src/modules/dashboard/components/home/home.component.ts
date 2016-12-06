import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { TimeComponent } from '../../components/time/time.component';

@Component({
    selector: 'home',
    templateUrl: './view/home.html',
    styleUrls:['./styles/home.css'],
    providers: [HomeService]
})

export class HomeComponent {

    public location: any = {};
    public temperature : number = 31;
    public humidity : number = 100;
    public windSpeed : number = 2.1;
    public visibility : number = 14483;
    public weatherData:any[] = [
        {
            "key":"Wind",
            "value":"Gentle Breeze 3.6 m/s",
            "color":"success"
        },
        {
            "key":"Cloudiness",
            "value":"Few clouds",
            "color":"warning"
        },
        {
            "key":"Rainfall",
            "value":"Light Rain",
            "color":"info"
        },
        {
            "key":"Pressure",
            "value":"1030 hpa",
            "color":"danger"
        },
        {
            "key":"Sunrise",
            "value":"13:15",
            "color":"success"
        },
        {
            "key":"Sunset",
            "value":"21:24",
            "color":"info"
        }];

        public dayWeather: any[] =[
            {
                "url":"assets/img/weather/sun.png",
                "color":"green",
                "temperature":"6.06 °C",
                "windSpeed":"2.3m/s",
                "status":"Clear Sky",
                "iconDirection":"up"
            },
            {
                "url":"assets/img/weather/rainy.png",
                "color":"red",
                "temperature":"-0.89 °C",
                "windSpeed":"3.08m/s",
                "status":"Light Rain",
                "iconDirection":"down"
            },
            {
                "url":"assets/img/weather/cloudy.png",
                "color":"yellow",
                "temperature":"0.58 °C",
                "windSpeed":"2.3m/s",
                "status":"Few Clouds",
                "iconDirection":"down"
            },
            {
                "url":"assets/img/weather/moderate.png",
                "color":"green",
                "temperature":"3.92 °C",
                "windSpeed":"2.33m/s",
                "status":"Moderate",
                "iconDirection":"up"
            },
            {
                "url":"assets/img/weather/rainy.png",
                "color":"red",
                "temperature":"-0.5 °C",
                "windSpeed":"1.36m/s",
                "status":"Rainy",
                "iconDirection":"down"
            },
            {
                "url":"assets/img/weather/cloudy.png",
                "color":"green",
                "temperature":"0.79 °C",
                "windSpeed":"1.96m/s",
                "status":"Cloudy",
                "iconDirection":"up"
            }
        ];

        public boxData : any[]=[
            {
                "label":"Temperature",
                "value":"28.06 °C",
                "color":"aqua",
                "icon":"fa-thermometer-full",
                "symbol":""
            },
            {
                "label":"Visibility",
                "value":"13486",
                "color":"green",
                "icon":"fa-sun-o",
                "symbol":""
            },
            {
                "label":"Humidity",
                "value":"100",
                "color":"yellow",
                "icon":"fa-tint",
                "symbol":"%"
            },
            {
                "label":"Wind Speed",
                "value":"2.1",
                "color":"red",
                "icon":"fa-mixcloud",
                "symbol":"m/s"
            }
        ]

    constructor(public homeService: HomeService) { }

    //get the position from navigator and store it in location
    setPosition(position) {
        //set the co-ordinates to location
        this.location = position.coords;

        console.log(this.location.latitude);
    }

    ngOnInit() {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        // };
    }
}