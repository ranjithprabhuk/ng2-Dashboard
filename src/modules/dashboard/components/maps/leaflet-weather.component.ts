import { Component } from '@angular/core';
import { CandTLeafletService } from 'angular2.leaflet.components';


@Component({
    selector:'leaflet-weather',
    templateUrl:'./view/leaflet-weather.html',
    providers:[CandTLeafletService]
})

export class LeafletWeatherComponent {
    public lat: number = 12.973425;
    public lng: number = 77.591168;
    public zoom: number = 9;
    public radius: number = 6000;

    public markerData :any[] = [
        {
            "lat":12.973425,
            "lng":77.591168,
            "mouseover":"<h3>32 <sup>o</sup> C",
            "iconUrl":"assets/img/weather/sun.png"
        },
        {
            "lat":12.173425,
            "lng":77.391168,
            "mouseover":"<h3>26 <sup>o</sup> C",
            "iconUrl":"assets/img/weather/rainy.png"
        }
    ]
}