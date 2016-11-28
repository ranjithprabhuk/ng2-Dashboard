import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
export class GoogleMapsAPIWrapper {
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise((resolve) => { this._mapResolver = resolve; });
    }
    createMap(el, mapOptions) {
        return this._loader.load().then(() => {
            const map = new google.maps.Map(el, mapOptions);
            this._mapResolver(map);
            return;
        });
    }
    setMapOptions(options) {
        this._map.then((m) => { m.setOptions(options); });
    }
    /**
     * Creates a google map marker with the map context
     */
    createMarker(options = {}) {
        return this._map.then((map) => {
            options.map = map;
            return new google.maps.Marker(options);
        });
    }
    createInfoWindow(options) {
        return this._map.then(() => { return new google.maps.InfoWindow(options); });
    }
    /**
     * Creates a google.map.Circle for the current map.
     */
    createCircle(options) {
        return this._map.then((map) => {
            options.map = map;
            return new google.maps.Circle(options);
        });
    }
    createPolyline(options) {
        return this.getNativeMap().then((map) => {
            let line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    }
    createPolygon(options) {
        return this.getNativeMap().then((map) => {
            let polygon = new google.maps.Polygon(options);
            polygon.setMap(map);
            return polygon;
        });
    }
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    containsLocation(latLng, polygon) {
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    }
    subscribeToMapEvent(eventName) {
        return Observable.create((observer) => {
            this._map.then((m) => {
                m.addListener(eventName, (arg) => { this._zone.run(() => observer.next(arg)); });
            });
        });
    }
    setCenter(latLng) {
        return this._map.then((map) => map.setCenter(latLng));
    }
    getZoom() { return this._map.then((map) => map.getZoom()); }
    getBounds() {
        return this._map.then((map) => map.getBounds());
    }
    setZoom(zoom) {
        return this._map.then((map) => map.setZoom(zoom));
    }
    getCenter() {
        return this._map.then((map) => map.getCenter());
    }
    panTo(latLng) {
        return this._map.then((map) => map.panTo(latLng));
    }
    fitBounds(latLng) {
        return this._map.then((map) => map.fitBounds(latLng));
    }
    panToBounds(latLng) {
        return this._map.then((map) => map.panToBounds(latLng));
    }
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    getNativeMap() { return this._map; }
    /**
     * Triggers the given event name on the map instance.
     */
    triggerMapEvent(eventName) {
        return this._map.then((m) => google.maps.event.trigger(m, eventName));
    }
}
GoogleMapsAPIWrapper.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapsAPIWrapper.ctorParameters = [
    { type: MapsAPILoader, },
    { type: NgZone, },
];
//# sourceMappingURL=google-maps-api-wrapper.js.map