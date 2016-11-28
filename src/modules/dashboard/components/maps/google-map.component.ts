import { Component } from '@angular/core';


// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    color?: string;
}

@Component({
    selector: 'google-map',
    templateUrl: './view/google-map.html',
    styleUrls: ['./styles/google-map.css']
})
export class GoogleMapComponent {
    public lat: number = 12.973425;
    public lng: number = 77.591168;
    public zoom: number = 10;
    public radius: number = 6000;


    public clickedMarker(label: string, index: number): void {
        console.log(`clicked the marker: ${label || index}`)
    }

    public mapClicked($event: any): void {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
    }

    public markerDragEnd(m: marker, $event: MouseEvent): void {
        console.log('dragEnd', m, $event);
    }

    //marker data for map 3
    public markers: marker[] = [
        {
            lat: this.lat,
            lng: this.lng,
            label: 'A',
            draggable: true,
            color: "red"
        }
    ];

    //marker data for map 1 (traffic markers in main map)
    public trafficMarkers: marker[] = [
        {
            lat: this.lat,
            lng: this.lng,
            label: 'A',
            draggable: true,
            color: "red"
        },
        {
            lat: 12.847539,
            lng: 77.670068,
            label: 'B',
            draggable: false,
            color: "green"
        },
        {
            lat: 12.982792,
            lng: 77.751843,
            label: 'C',
            draggable: true,
            color: "yellow"
        },
        {
            lat: 12.889102,
            lng: 77.453839,
            label: 'D',
            draggable: true,
            color: "blue"
        }
    ]

}

