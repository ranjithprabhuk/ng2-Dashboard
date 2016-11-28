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
var core_1 = require('@angular/core');
var GoogleMapComponent = (function () {
    function GoogleMapComponent() {
        this.lat = 12.973425;
        this.lng = 77.591168;
        this.zoom = 10;
        this.radius = 6000;
        //marker data for map 3
        this.markers = [
            {
                lat: this.lat,
                lng: this.lng,
                label: 'A',
                draggable: true,
                color: "red"
            }
        ];
        //marker data for map 1 (traffic markers in main map)
        this.trafficMarkers = [
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
        ];
    }
    GoogleMapComponent.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker: " + (label || index));
    };
    GoogleMapComponent.prototype.mapClicked = function ($event) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
    };
    GoogleMapComponent.prototype.markerDragEnd = function (m, $event) {
        console.log('dragEnd', m, $event);
    };
    GoogleMapComponent = __decorate([
        core_1.Component({
            selector: 'google-map',
            templateUrl: 'app/modules/dashboard/components/maps/view/google-map.html',
            styleUrls: ['app/modules/dashboard/components/maps/styles/google-map.css']
        }), 
        __metadata('design:paramtypes', [])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());
exports.GoogleMapComponent = GoogleMapComponent;
//# sourceMappingURL=google-map.component.js.map