"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var google_map_polyline_1 = require('../../directives/google-map-polyline');
var google_maps_api_wrapper_1 = require('../../services/google-maps-api-wrapper');
var polyline_manager_1 = require('../../services/managers/polyline-manager');
describe('PolylineManager', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: core_1.NgZone, useFactory: function () { return new core_1.NgZone({ enableLongStackTrace: true }); } },
                polyline_manager_1.PolylineManager, {
                    provide: google_maps_api_wrapper_1.GoogleMapsAPIWrapper,
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createPolyline'])
                }
            ]
        });
    });
    describe('Create a new polyline', function () {
        it('should call the mapsApiWrapper when creating a new polyline', testing_1.inject([polyline_manager_1.PolylineManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (polylineManager, apiWrapper) {
            var newPolyline = new google_map_polyline_1.SebmGoogleMapPolyline(polylineManager);
            polylineManager.addPolyline(newPolyline);
            expect(apiWrapper.createPolyline).toHaveBeenCalledWith({
                clickable: true,
                draggable: false,
                editable: false,
                geodesic: false,
                strokeColor: undefined,
                strokeOpacity: undefined,
                strokeWeight: undefined,
                visible: true,
                zIndex: undefined,
                path: []
            });
        }));
    });
    describe('Delete a polyline', function () {
        it('should set the map to null when deleting a existing polyline', testing_1.inject([polyline_manager_1.PolylineManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (polylineManager, apiWrapper) {
            var newPolyline = new google_map_polyline_1.SebmGoogleMapPolyline(polylineManager);
            var polylineInstance = jasmine.createSpyObj('Polyline', ['setMap']);
            apiWrapper.createPolyline.and.returnValue(Promise.resolve(polylineInstance));
            polylineManager.addPolyline(newPolyline);
            polylineManager.deletePolyline(newPolyline).then(function () {
                expect(polylineInstance.setMap).toHaveBeenCalledWith(null);
            });
        }));
    });
});
//# sourceMappingURL=polyline-manager.spec.js.map