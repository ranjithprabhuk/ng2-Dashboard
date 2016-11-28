"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var google_map_polygon_1 = require('../../directives/google-map-polygon');
var google_maps_api_wrapper_1 = require('../google-maps-api-wrapper');
var polygon_manager_1 = require('./polygon-manager');
describe('PolygonManager', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: core_1.NgZone, useFactory: function () { return new core_1.NgZone({ enableLongStackTrace: true }); } },
                polygon_manager_1.PolygonManager, google_map_polygon_1.SebmGoogleMapPolygon, {
                    provide: google_maps_api_wrapper_1.GoogleMapsAPIWrapper,
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createPolygon'])
                }
            ]
        });
    });
    describe('Create a new polygon', function () {
        it('should call the mapsApiWrapper when creating a new polygon', testing_1.inject([polygon_manager_1.PolygonManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (polygonManager, apiWrapper) {
            var newPolygon = new google_map_polygon_1.SebmGoogleMapPolygon(polygonManager);
            polygonManager.addPolygon(newPolygon);
            expect(apiWrapper.createPolygon).toHaveBeenCalledWith({
                clickable: true,
                draggable: false,
                editable: false,
                fillColor: undefined,
                fillOpacity: undefined,
                geodesic: false,
                paths: [],
                strokeColor: undefined,
                strokeOpacity: undefined,
                strokeWeight: undefined,
                visible: undefined,
                zIndex: undefined
            });
        }));
    });
    describe('Delete a polygon', function () {
        it('should set the map to null when deleting a existing polygon', testing_1.inject([polygon_manager_1.PolygonManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (polygonManager, apiWrapper) {
            var newPolygon = new google_map_polygon_1.SebmGoogleMapPolygon(polygonManager);
            var polygonInstance = jasmine.createSpyObj('Polygon', ['setMap']);
            apiWrapper.createPolygon.and.returnValue(Promise.resolve(polygonInstance));
            polygonManager.addPolygon(newPolygon);
            polygonManager.deletePolygon(newPolygon).then(function () {
                expect(polygonInstance.setMap).toHaveBeenCalledWith(null);
            });
        }));
    });
});
//# sourceMappingURL=polygon-manager.spec.js.map