import { Directive, EventEmitter, Input, Output } from '@angular/core';
/**
 * SebmGoogleMapPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
export class SebmGoogleMapPolylinePoint {
    constructor() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
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
    { type: Directive, args: [{ selector: 'sebm-google-map-polyline-point' },] },
];
/** @nocollapse */
SebmGoogleMapPolylinePoint.ctorParameters = [];
SebmGoogleMapPolylinePoint.propDecorators = {
    'latitude': [{ type: Input },],
    'longitude': [{ type: Input },],
    'positionChanged': [{ type: Output },],
};
//# sourceMappingURL=google-map-polyline-point.js.map