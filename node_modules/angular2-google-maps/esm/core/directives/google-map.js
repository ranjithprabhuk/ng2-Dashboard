import { Component, ElementRef, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { CircleManager } from '../services/managers/circle-manager';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { PolygonManager } from '../services/managers/polygon-manager';
import { PolylineManager } from '../services/managers/polyline-manager';
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
export class SebmGoogleMap {
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
        this.mapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new EventEmitter();
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
    { type: Component, args: [{
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
    { type: ElementRef, },
    { type: GoogleMapsAPIWrapper, },
];
//# sourceMappingURL=google-map.js.map