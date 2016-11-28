import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
export class CircleManager {
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
        return Observable.create((observer) => {
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
    { type: Injectable },
];
/** @nocollapse */
CircleManager.ctorParameters = [
    { type: GoogleMapsAPIWrapper, },
    { type: NgZone, },
];
//# sourceMappingURL=circle-manager.js.map