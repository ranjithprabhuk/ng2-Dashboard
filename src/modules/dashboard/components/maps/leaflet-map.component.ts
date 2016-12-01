import { Component } from '@angular/core';
import { CandTLeafletService } from 'angular2.leaflet.components';


@Component({
    selector:'leafet-map',
    templateUrl:'./view/leafet-map.html',
    providers:[CandTLeafletService]
})

export class LeafletMapComponent {

}