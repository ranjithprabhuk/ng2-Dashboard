import { ContentChild, Directive, EventEmitter } from '@angular/core';
import { MarkerManager } from '../services/managers/marker-manager';
import { SebmGoogleMapInfoWindow } from './google-map-info-window';
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
export class SebmGoogleMapMarker {
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
        this.markerClick = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new EventEmitter();
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
    { type: Directive, args: [{
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
    'infoWindow': [{ type: ContentChild, args: [SebmGoogleMapInfoWindow,] },],
};
//# sourceMappingURL=google-map-marker.js.map