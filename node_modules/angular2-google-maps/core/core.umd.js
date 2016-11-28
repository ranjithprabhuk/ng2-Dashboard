(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable')) :
  typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable'], factory) :
  (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.core = global.ngmaps.core || {}),global.ng.core,global.Rx));
}(this, (function (exports,_angular_core,rxjs_Observable) { 'use strict';

class MapsAPILoader {
}
MapsAPILoader.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
MapsAPILoader.ctorParameters = [];

/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
class GoogleMapsAPIWrapper {
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
        return rxjs_Observable.Observable.create((observer) => {
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
    { type: _angular_core.Injectable },
];
/** @nocollapse */
GoogleMapsAPIWrapper.ctorParameters = [
    { type: MapsAPILoader, },
    { type: _angular_core.NgZone, },
];

class CircleManager {
    constructor(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    addCircle(circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex
        }));
    }
    ;
    /**
     * Removes the given circle from the map.
     */
    removeCircle(circle) {
        return this._circles.get(circle).then((c) => {
            c.setMap(null);
            this._circles.delete(circle);
        });
    }
    setOptions(circle, options) {
        return this._circles.get(circle).then((c) => c.setOptions(options));
    }
    ;
    getBounds(circle) {
        return this._circles.get(circle).then((c) => c.getBounds());
    }
    ;
    getCenter(circle) {
        return this._circles.get(circle).then((c) => c.getCenter());
    }
    ;
    getRadius(circle) {
        return this._circles.get(circle).then((c) => c.getRadius());
    }
    setCenter(circle) {
        return this._circles.get(circle).then((c) => { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    }
    ;
    setEditable(circle) {
        return this._circles.get(circle).then((c) => { return c.setEditable(circle.editable); });
    }
    ;
    setDraggable(circle) {
        return this._circles.get(circle).then((c) => { return c.setDraggable(circle.draggable); });
    }
    ;
    setVisible(circle) {
        return this._circles.get(circle).then((c) => { return c.setVisible(circle.visible); });
    }
    ;
    setRadius(circle) {
        return this._circles.get(circle).then((c) => { return c.setRadius(circle.radius); });
    }
    ;
    createEventObservable(eventName, circle) {
        return rxjs_Observable.Observable.create((observer) => {
            let listener = null;
            this._circles.get(circle).then((c) => {
                listener = c.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
            return () => {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    }
}
CircleManager.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
CircleManager.ctorParameters = [
    { type: GoogleMapsAPIWrapper, },
    { type: _angular_core.NgZone, },
];

class MarkerManager {
    constructor(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    deleteMarker(marker) {
        const m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then((m) => {
            return this._zone.run(() => {
                m.setMap(null);
                this._markers.delete(marker);
            });
        });
    }
    updateMarkerPosition(marker) {
        return this._markers.get(marker).then((m) => m.setPosition({ lat: marker.latitude, lng: marker.longitude }));
    }
    updateTitle(marker) {
        return this._markers.get(marker).then((m) => m.setTitle(marker.title));
    }
    updateLabel(marker) {
        return this._markers.get(marker).then((m) => { m.setLabel(marker.label); });
    }
    updateDraggable(marker) {
        return this._markers.get(marker).then((m) => m.setDraggable(marker.draggable));
    }
    updateIcon(marker) {
        return this._markers.get(marker).then((m) => m.setIcon(marker.iconUrl));
    }
    updateOpacity(marker) {
        return this._markers.get(marker).then((m) => m.setOpacity(marker.opacity));
    }
    updateVisible(marker) {
        return this._markers.get(marker).then((m) => m.setVisible(marker.visible));
    }
    updateZIndex(marker) {
        return this._markers.get(marker).then((m) => m.setZIndex(marker.zIndex));
    }
    addMarker(marker) {
        const markerPromise = this._mapsWrapper.createMarker({
            position: { lat: marker.latitude, lng: marker.longitude },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title
        });
        this._markers.set(marker, markerPromise);
    }
    getNativeMarker(marker) {
        return this._markers.get(marker);
    }
    createEventObservable(eventName, marker) {
        return rxjs_Observable.Observable.create((observer) => {
            this._markers.get(marker).then((m) => {
                m.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
}
MarkerManager.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
MarkerManager.ctorParameters = [
    { type: GoogleMapsAPIWrapper, },
    { type: _angular_core.NgZone, },
];

class InfoWindowManager {
    constructor(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    deleteInfoWindow(infoWindow) {
        const iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then((i) => {
            return this._zone.run(() => {
                i.close();
                this._infoWindows.delete(infoWindow);
            });
        });
    }
    setPosition(infoWindow) {
        return this._infoWindows.get(infoWindow).then((i) => i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude
        }));
    }
    setZIndex(infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then((i) => i.setZIndex(infoWindow.zIndex));
    }
    open(infoWindow) {
        return this._infoWindows.get(infoWindow).then((w) => {
            if (infoWindow.hostMarker != null) {
                return this._markerManager.getNativeMarker(infoWindow.hostMarker).then((marker) => {
                    return this._mapsWrapper.getNativeMap().then((map) => w.open(map, marker));
                });
            }
            return this._mapsWrapper.getNativeMap().then((map) => w.open(map));
        });
    }
    close(infoWindow) {
        return this._infoWindows.get(infoWindow).then((w) => w.close());
    }
    setOptions(infoWindow, options) {
        return this._infoWindows.get(infoWindow).then((i) => i.setOptions(options));
    }
    addInfoWindow(infoWindow) {
        const options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        const infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    }
}
InfoWindowManager.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
InfoWindowManager.ctorParameters = [
    { type: GoogleMapsAPIWrapper, },
    { type: _angular_core.NgZone, },
    { type: MarkerManager, },
];

class PolygonManager {
    constructor(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    addPolygon(path) {
        const polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    }
    updatePolygon(polygon) {
        const m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => this._zone.run(() => { l.setPaths(polygon.paths); }));
    }
    setPolygonOptions(path, options) {
        return this._polygons.get(path).then((l) => { l.setOptions(options); });
    }
    deletePolygon(paths) {
        const m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.setMap(null);
                this._polygons.delete(paths);
            });
        });
    }
    createEventObservable(eventName, path) {
        return rxjs_Observable.Observable.create((observer) => {
            this._polygons.get(path).then((l) => {
                l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
}
PolygonManager.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
PolygonManager.ctorParameters = [
    { type: GoogleMapsAPIWrapper, },
    { type: _angular_core.NgZone, },
];

class PolylineManager {
    constructor(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    static _convertPoints(line) {
        const path = line._getPoints().map((point) => {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    }
    addPolyline(line) {
        const path = PolylineManager._convertPoints(line);
        const polylinePromise = this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path: path
        });
        this._polylines.set(line, polylinePromise);
    }
    updatePolylinePoints(line) {
        const path = PolylineManager._convertPoints(line);
        const m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => { return this._zone.run(() => { l.setPath(path); }); });
    }
    setPolylineOptions(line, options) {
        return this._polylines.get(line).then((l) => { l.setOptions(options); });
    }
    deletePolyline(line) {
        const m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.setMap(null);
                this._polylines.delete(line);
            });
        });
    }
    createEventObservable(eventName, line) {
        return rxjs_Observable.Observable.create((observer) => {
            this._polylines.get(line).then((l) => {
                l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
}
PolylineManager.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
PolylineManager.ctorParameters = [
    { type: GoogleMapsAPIWrapper, },
    { type: _angular_core.NgZone, },
];

/**
 * SebMGoogleMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `sebm-google-map-container`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { SebmGoogleMap } from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
class SebmGoogleMap {
    constructor(_elem, _mapsWrapper) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * The enabled/disabled state of the Zoom control.
         */
        this.zoomControl = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * The initial enabled/disabled state of the Street View Pegman control.
         * This control is part of the default UI, and should be set to false when displaying a map type
         * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
         */
        this.streetViewControl = true;
        /**
         * Sets the viewport to contain the given bounds.
         */
        this.fitBounds = null;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new _angular_core.EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new _angular_core.EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new _angular_core.EventEmitter();
    }
    /** @internal */
    ngOnInit() {
        // todo: this should be solved with a new component and a viewChild decorator
        const container = this._elem.nativeElement.querySelector('.sebm-google-map-container-inner');
        this._initMapInstance(container);
    }
    _initMapInstance(el) {
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            disableDefaultUI: this.disableDefaultUI,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            zoomControl: this.zoomControl,
            styles: this.styles,
            streetViewControl: this.streetViewControl,
            scaleControl: this.scaleControl,
            mapTypeControl: this.mapTypeControl
        });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleIdleEvent();
    }
    /** @internal */
    ngOnDestroy() {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
    /* @internal */
    ngOnChanges(changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    }
    _updateMapOptionsChanges(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => SebmGoogleMap._mapOptionsAttributes.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    }
    /**
     * Triggers a resize event on the google map instance.
     * Returns a promise that gets resolved after the event was triggered.
     */
    triggerResize() {
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise((resolve) => {
            setTimeout(() => { return this._mapsWrapper.triggerMapEvent('resize').then(() => resolve()); });
        });
    }
    _updatePosition(changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            changes['fitBounds'] == null) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if (changes['fitBounds'] && this.fitBounds != null) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        let newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    }
    _fitBounds() {
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(this.fitBounds);
            return;
        }
        this._mapsWrapper.fitBounds(this.fitBounds);
    }
    _handleMapCenterChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(() => {
            this._mapsWrapper.getCenter().then((center) => {
                this.latitude = center.lat();
                this.longitude = center.lng();
                this.centerChange.emit({ lat: this.latitude, lng: this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    }
    _handleBoundsChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(() => {
            this._mapsWrapper.getBounds().then((bounds) => { this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    }
    _handleMapZoomChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(() => {
            this._mapsWrapper.getZoom().then((z) => {
                this.zoom = z;
                this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    }
    _handleIdleEvent() {
        const s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(() => { this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    }
    _handleMapMouseEvents() {
        const events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
        ];
        events.forEach((e) => {
            const s = this._mapsWrapper.subscribeToMapEvent(e.name).subscribe((event) => {
                const value = { coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
                e.emitter.emit(value);
            });
            this._observableSubscriptions.push(s);
        });
    }
}
/**
 * Map option attributes that can change over time
 */
SebmGoogleMap._mapOptionsAttributes = [
    'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
    'keyboardShortcuts', 'zoomControl', 'styles', 'streetViewControl', 'zoom', 'mapTypeControl'
];
SebmGoogleMap.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'sebm-google-map',
                providers: [
                    GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager, CircleManager, PolylineManager,
                    PolygonManager
                ],
                inputs: [
                    'longitude', 'latitude', 'zoom', 'draggable: mapDraggable', 'disableDoubleClickZoom',
                    'disableDefaultUI', 'scrollwheel', 'backgroundColor', 'draggableCursor', 'draggingCursor',
                    'keyboardShortcuts', 'zoomControl', 'styles', 'usePanning', 'streetViewControl', 'fitBounds',
                    'scaleControl', 'mapTypeControl'
                ],
                outputs: [
                    'mapClick', 'mapRightClick', 'mapDblClick', 'centerChange', 'idle', 'boundsChange', 'zoomChange'
                ],
                host: { '[class.sebm-google-map-container]': 'true' },
                styles: [`
    .sebm-google-map-container-inner {
      width: inherit;
      height: inherit;
    }
    .sebm-google-map-content {
      display:none;
    }
  `],
                template: `
    <div class='sebm-google-map-container-inner'></div>
    <div class='sebm-google-map-content'>
      <ng-content></ng-content>
    </div>
  `
            },] },
];
/** @nocollapse */
SebmGoogleMap.ctorParameters = [
    { type: _angular_core.ElementRef, },
    { type: GoogleMapsAPIWrapper, },
];

class SebmGoogleMapCircle {
    constructor(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new _angular_core.EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new _angular_core.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new _angular_core.EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new _angular_core.EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new _angular_core.EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new _angular_core.EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new _angular_core.EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    ngOnInit() {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    }
    _updateCircleOptionsChanges(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => SebmGoogleMapCircle._mapOptions.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _registerEventListeners() {
        let events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach((eventEmitter, eventName) => {
            this._eventSubscriptions.push(this._manager.createEventObservable(eventName, this).subscribe((value) => {
                switch (eventName) {
                    case 'radius_changed':
                        this._manager.getRadius(this).then((radius) => eventEmitter.emit(radius));
                        break;
                    case 'center_changed':
                        this._manager.getCenter(this).then((center) => eventEmitter.emit({ lat: center.lat(), lng: center.lng() }));
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    }
    /** @internal */
    ngOnDestroy() {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    }
    /**
     * Gets the LatLngBounds of this Circle.
     */
    getBounds() { return this._manager.getBounds(this); }
    getCenter() { return this._manager.getCenter(this); }
}
SebmGoogleMapCircle._mapOptions = [
    'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
    'visible', 'zIndex'
];
SebmGoogleMapCircle.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sebm-google-map-circle',
                inputs: [
                    'latitude', 'longitude', 'clickable', 'draggable: circleDraggable', 'editable', 'fillColor',
                    'fillOpacity', 'radius', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
                    'visible', 'zIndex'
                ],
                outputs: [
                    'centerChange', 'circleClick', 'circleDblClick', 'drag', 'dragEnd', 'dragStart', 'mouseDown',
                    'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'radiusChange', 'rightClick'
                ]
            },] },
];
/** @nocollapse */
SebmGoogleMapCircle.ctorParameters = [
    { type: CircleManager, },
];

let infoWindowId = 0;
/**
 * SebmGoogleMapInfoWindow renders a info window inside a {@link SebmGoogleMapMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow } from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <sebm-google-map-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </sebm-google-map-info-window>
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
class SebmGoogleMapInfoWindow {
    constructor(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new _angular_core.EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    ngOnInit() {
        this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    }
    _updateOpenState() {
        this.isOpen ? this._infoWindowManager.open(this) : this._infoWindowManager.close(this);
    }
    _setInfoWindowOptions(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => SebmGoogleMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    }
    /**
     * Opens the info window.
     */
    open() { return this._infoWindowManager.open(this); }
    /**
     * Closes the info window.
     */
    close() {
        return this._infoWindowManager.close(this).then(() => { this.infoWindowClose.emit(void 0); });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return 'SebmGoogleMapInfoWindow-' + this._id.toString(); }
    /** @internal */
    ngOnDestroy() { this._infoWindowManager.deleteInfoWindow(this); }
}
SebmGoogleMapInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
SebmGoogleMapInfoWindow.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'sebm-google-map-info-window',
                inputs: ['latitude', 'longitude', 'disableAutoPan', 'isOpen', 'zIndex', 'maxWidth'],
                outputs: ['infoWindowClose'],
                template: `<div class='sebm-google-map-info-window-content'>
      <ng-content></ng-content>
    </div>
  `
            },] },
];
/** @nocollapse */
SebmGoogleMapInfoWindow.ctorParameters = [
    { type: InfoWindowManager, },
    { type: _angular_core.ElementRef, },
];

let markerId = 0;
/**
 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
class SebmGoogleMapMarker {
    constructor(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new _angular_core.EventEmitter();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._id = (markerId++).toString();
    }
    /* @internal */
    ngAfterContentInit() {
        if (this.infoWindow != null) {
            this.infoWindow.hostMarker = this;
        }
    }
    /** @internal */
    ngOnChanges(changes) {
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
    }
    _addEventListeners() {
        const cs = this._markerManager.createEventObservable('click', this).subscribe(() => {
            if (this.openInfoWindow && this.infoWindow != null) {
                this.infoWindow.open();
            }
            this.markerClick.emit(null);
        });
        this._observableSubscriptions.push(cs);
        const ds = this._markerManager.createEventObservable('dragend', this)
            .subscribe((e) => {
            this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        const mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe((e) => {
            this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        const mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe((e) => {
            this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return 'SebmGoogleMapMarker-' + this._id.toString(); }
    /** @internal */
    ngOnDestroy() {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
}
SebmGoogleMapMarker.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sebm-google-map-marker',
                inputs: [
                    'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                    'openInfoWindow', 'opacity', 'visible', 'zIndex'
                ],
                outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
            },] },
];
/** @nocollapse */
SebmGoogleMapMarker.ctorParameters = [
    { type: MarkerManager, },
];
SebmGoogleMapMarker.propDecorators = {
    'infoWindow': [{ type: _angular_core.ContentChild, args: [SebmGoogleMapInfoWindow,] },],
};

/**
 * SebmGoogleMapPolygon renders a polygon on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { SebmGoogleMap, SebmGooglePolygon, LatLngLiteral } from 'angular2-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .semb-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <semb-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <semb-map-polygon [paths]="paths">
 *      </semb-map-polygon>
 *    </semb-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
class SebmGoogleMapPolygon {
    constructor(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new _angular_core.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new _angular_core.EventEmitter();
        /**
         * This even is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new _angular_core.EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    ngAfterContentInit() {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    }
    ngOnChanges(changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    }
    _init() {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const handlers = [
            { name: 'click', handler: (ev) => this.polyClick.emit(ev) },
            { name: 'dbclick', handler: (ev) => this.polyDblClick.emit(ev) },
            { name: 'drag', handler: (ev) => this.polyDrag.emit(ev) },
            { name: 'dragend', handler: (ev) => this.polyDragEnd.emit(ev) },
            { name: 'dragstart', handler: (ev) => this.polyDragStart.emit(ev) },
            { name: 'mousedown', handler: (ev) => this.polyMouseDown.emit(ev) },
            { name: 'mousemove', handler: (ev) => this.polyMouseMove.emit(ev) },
            { name: 'mouseout', handler: (ev) => this.polyMouseOut.emit(ev) },
            { name: 'mouseover', handler: (ev) => this.polyMouseOver.emit(ev) },
            { name: 'mouseup', handler: (ev) => this.polyMouseUp.emit(ev) },
            { name: 'rightclick', handler: (ev) => this.polyRightClick.emit(ev) },
        ];
        handlers.forEach((obj) => {
            const os = this._polygonManager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
    }
    _updatePolygonOptions(changes) {
        return Object.keys(changes)
            .filter(k => SebmGoogleMapPolygon._polygonOptionsAttributes.indexOf(k) !== -1)
            .reduce((obj, k) => {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    ngOnDestroy() {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach((s) => s.unsubscribe());
    }
}
SebmGoogleMapPolygon._polygonOptionsAttributes = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
    'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
    'editable', 'visible'
];
SebmGoogleMapPolygon.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sebm-map-polygon',
                inputs: [
                    'clickable',
                    'draggable: polyDraggable',
                    'editable',
                    'fillColor',
                    'fillOpacity',
                    'geodesic',
                    'paths',
                    'strokeColor',
                    'strokeOpacity',
                    'strokeWeight',
                    'visible',
                    'zIndex',
                ],
                outputs: [
                    'polyClick', 'polyDblClick', 'polyDrag', 'polyDragEnd', 'polyMouseDown', 'polyMouseMove',
                    'polyMouseOut', 'polyMouseOver', 'polyMouseUp', 'polyRightClick'
                ]
            },] },
];
/** @nocollapse */
SebmGoogleMapPolygon.ctorParameters = [
    { type: PolygonManager, },
];

/**
 * SebmGoogleMapPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
class SebmGoogleMapPolylinePoint {
    constructor() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new _angular_core.EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['latitude'] || changes['longitude']) {
            const position = {
                lat: changes['latitude'].currentValue,
                lng: changes['longitude'].currentValue
            };
            this.positionChanged.emit(position);
        }
    }
}
SebmGoogleMapPolylinePoint.decorators = [
    { type: _angular_core.Directive, args: [{ selector: 'sebm-google-map-polyline-point' },] },
];
/** @nocollapse */
SebmGoogleMapPolylinePoint.ctorParameters = [];
SebmGoogleMapPolylinePoint.propDecorators = {
    'latitude': [{ type: _angular_core.Input },],
    'longitude': [{ type: _angular_core.Input },],
    'positionChanged': [{ type: _angular_core.Output },],
};

let polylineId = 0;
/**
 * SebmGoogleMapPolyline renders a polyline on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint } from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-polyline>
 *          <sebm-google-map-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </sebm-google-map-polyline-point>
 *          <sebm-google-map-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </sebm-google-map-polyline-point>
 *      </sebm-google-map-polyline>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
class SebmGoogleMapPolyline {
    constructor(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new _angular_core.EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new _angular_core.EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new _angular_core.EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new _angular_core.EventEmitter();
        /**
         * This even is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new _angular_core.EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    /** @internal */
    ngAfterContentInit() {
        if (this.points.length) {
            this.points.forEach((point) => {
                const s = point.positionChanged.subscribe(() => { this._polylineManager.updatePolylinePoints(this); });
                this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        const s = this.points.changes.subscribe(() => this._polylineManager.updatePolylinePoints(this));
        this._subscriptions.push(s);
        this._polylineManager.updatePolylinePoints(this);
    }
    ngOnChanges(changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        let options = {};
        const optionKeys = Object.keys(changes).filter(k => SebmGoogleMapPolyline._polylineOptionsAttributes.indexOf(k) !== -1);
        optionKeys.forEach(k => options[k] = changes[k].currentValue);
        this._polylineManager.setPolylineOptions(this, options);
    }
    _init() {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const handlers = [
            { name: 'click', handler: (ev) => this.lineClick.emit(ev) },
            { name: 'dbclick', handler: (ev) => this.lineDblClick.emit(ev) },
            { name: 'drag', handler: (ev) => this.lineDrag.emit(ev) },
            { name: 'dragend', handler: (ev) => this.lineDragEnd.emit(ev) },
            { name: 'dragstart', handler: (ev) => this.lineDragStart.emit(ev) },
            { name: 'mousedown', handler: (ev) => this.lineMouseDown.emit(ev) },
            { name: 'mousemove', handler: (ev) => this.lineMouseMove.emit(ev) },
            { name: 'mouseout', handler: (ev) => this.lineMouseOut.emit(ev) },
            { name: 'mouseover', handler: (ev) => this.lineMouseOver.emit(ev) },
            { name: 'mouseup', handler: (ev) => this.lineMouseUp.emit(ev) },
            { name: 'rightclick', handler: (ev) => this.lineRightClick.emit(ev) },
        ];
        handlers.forEach((obj) => {
            const os = this._polylineManager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    _getPoints() {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    ngOnDestroy() {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach((s) => s.unsubscribe());
    }
}
SebmGoogleMapPolyline._polylineOptionsAttributes = [
    'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
    'zIndex'
];
SebmGoogleMapPolyline.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'sebm-google-map-polyline',
                inputs: [
                    'clickable', 'draggable: polylineDraggable', 'editable', 'geodesic', 'strokeColor',
                    'strokeWeight', 'strokeOpacity', 'visible', 'zIndex'
                ],
                outputs: [
                    'lineClick', 'lineDblClick', 'lineDrag', 'lineDragEnd', 'lineMouseDown', 'lineMouseMove',
                    'lineMouseOut', 'lineMouseOver', 'lineMouseUp', 'lineRightClick'
                ]
            },] },
];
/** @nocollapse */
SebmGoogleMapPolyline.ctorParameters = [
    { type: PolylineManager, },
];
SebmGoogleMapPolyline.propDecorators = {
    'points': [{ type: _angular_core.ContentChildren, args: [SebmGoogleMapPolylinePoint,] },],
};

class WindowRef {
    getNativeWindow() { return window; }
}
class DocumentRef {
    getNativeDocument() { return document; }
}
const BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];

(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(exports.GoogleMapsScriptProtocol || (exports.GoogleMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
const LAZY_MAPS_API_CONFIG = new _angular_core.OpaqueToken('angular2-google-maps LAZY_MAPS_API_CONFIG');
class LazyMapsAPILoader extends MapsAPILoader {
    constructor(config, w, d) {
        super();
        this._config = config || {};
        this._windowRef = w;
        this._documentRef = d;
    }
    load() {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        const script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName = `angular2GoogleMapsLazyMapsAPILoader`;
        script.src = this._getScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            this._windowRef.getNativeWindow()[callbackName] = () => { resolve(); };
            script.onerror = (error) => { reject(error); };
        });
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    }
    _getScriptSrc(callbackName) {
        let protocolType = (this._config && this._config.protocol) || exports.GoogleMapsScriptProtocol.HTTPS;
        let protocol;
        switch (protocolType) {
            case exports.GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case exports.GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case exports.GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        const hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        const queryParams = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        const params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            // join arrays as comma seperated strings
            let i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => { return `${entry.key}=${entry.value}`; })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
LazyMapsAPILoader.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
LazyMapsAPILoader.ctorParameters = [
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [LAZY_MAPS_API_CONFIG,] },] },
    { type: WindowRef, },
    { type: DocumentRef, },
];

/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
class NoOpMapsAPILoader {
    load() {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    }
    ;
}

// exported map types

/**
 * @internal
 */
function coreDirectives() {
    return [
        SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle,
        SebmGoogleMapPolygon, SebmGoogleMapPolyline, SebmGoogleMapPolylinePoint
    ];
}

/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: [
                ...BROWSER_GLOBALS_PROVIDERS, { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }
            ],
        };
    }
}
AgmCoreModule.decorators = [
    { type: _angular_core.NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] },
];
/** @nocollapse */
AgmCoreModule.ctorParameters = [];

// main modules

exports.AgmCoreModule = AgmCoreModule;
exports.SebmGoogleMap = SebmGoogleMap;
exports.SebmGoogleMapCircle = SebmGoogleMapCircle;
exports.SebmGoogleMapInfoWindow = SebmGoogleMapInfoWindow;
exports.SebmGoogleMapMarker = SebmGoogleMapMarker;
exports.SebmGoogleMapPolygon = SebmGoogleMapPolygon;
exports.SebmGoogleMapPolyline = SebmGoogleMapPolyline;
exports.SebmGoogleMapPolylinePoint = SebmGoogleMapPolylinePoint;
exports.GoogleMapsAPIWrapper = GoogleMapsAPIWrapper;
exports.CircleManager = CircleManager;
exports.InfoWindowManager = InfoWindowManager;
exports.MarkerManager = MarkerManager;
exports.PolygonManager = PolygonManager;
exports.PolylineManager = PolylineManager;
exports.LAZY_MAPS_API_CONFIG = LAZY_MAPS_API_CONFIG;
exports.LazyMapsAPILoader = LazyMapsAPILoader;
exports.MapsAPILoader = MapsAPILoader;
exports.NoOpMapsAPILoader = NoOpMapsAPILoader;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core.umd.js.map
