import { Component } from '@angular/core';
import { CandTLeafletService } from 'angular2.leaflet.components';


@Component({
    selector:'leafet-map',
    templateUrl:'./view/leaflet-map.html',
    providers:[CandTLeafletService]
})

export class LeafletMapComponent {
    public lat: number = 12.973425;
    public lng: number = 77.591168;
    public zoom: number = 10;
    public radius: number = 6000;
    public minZoom: number = 12.973425;
    public maxZoom: number = 77.591168;
}