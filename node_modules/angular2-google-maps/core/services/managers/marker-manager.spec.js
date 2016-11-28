"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var google_map_marker_1 = require('./../../directives/google-map-marker');
var google_maps_api_wrapper_1 = require('./../google-maps-api-wrapper');
var marker_manager_1 = require('./../managers/marker-manager');
describe('MarkerManager', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: core_1.NgZone, useFactory: function () { return new core_1.NgZone({ enableLongStackTrace: true }); } },
                marker_manager_1.MarkerManager, {
                    provide: google_maps_api_wrapper_1.GoogleMapsAPIWrapper,
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createMarker'])
                }
            ]
        });
    });
    describe('Create a new marker', function () {
        it('should call the mapsApiWrapper when creating a new marker', testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                opacity: 1,
                visible: true,
                zIndex: 1,
                title: undefined
            });
        }));
    });
    describe('Delete a marker', function () {
        it('should set the map to null when deleting a existing marker', testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            markerManager.deleteMarker(newMarker).then(function () { expect(markerInstance.setMap).toHaveBeenCalledWith(null); });
        }));
    });
    describe('set marker icon', function () {
        it('should update that marker via setIcon method when the markerUrl changes', testing_1.async(testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setIcon']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                opacity: 1,
                visible: true,
                zIndex: 1,
                title: undefined
            });
            var iconUrl = 'http://angular-maps.com/icon.png';
            newMarker.iconUrl = iconUrl;
            return markerManager.updateIcon(newMarker).then(function () { expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl); });
        })));
    });
    describe('set marker opacity', function () {
        it('should update that marker via setOpacity method when the markerOpacity changes', testing_1.async(testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setOpacity']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: true,
                opacity: 1,
                zIndex: 1,
                title: undefined
            });
            var opacity = 0.4;
            newMarker.opacity = opacity;
            return markerManager.updateOpacity(newMarker).then(function () { expect(markerInstance.setOpacity).toHaveBeenCalledWith(opacity); });
        })));
    });
    describe('set visible option', function () {
        it('should update that marker via setVisible method when the visible changes', testing_1.async(testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            newMarker.visible = false;
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setVisible']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: false,
                opacity: 1,
                zIndex: 1,
                title: undefined
            });
            newMarker.visible = true;
            return markerManager.updateVisible(newMarker).then(function () { expect(markerInstance.setVisible).toHaveBeenCalledWith(true); });
        })));
    });
    describe('set zIndex option', function () {
        it('should update that marker via setZIndex method when the zIndex changes', testing_1.async(testing_1.inject([marker_manager_1.MarkerManager, google_maps_api_wrapper_1.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new google_map_marker_1.SebmGoogleMapMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            newMarker.visible = false;
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setZIndex']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: false,
                opacity: 1,
                zIndex: 1,
                title: undefined
            });
            var zIndex = 10;
            newMarker.zIndex = zIndex;
            return markerManager.updateZIndex(newMarker).then(function () { expect(markerInstance.setZIndex).toHaveBeenCalledWith(zIndex); });
        })));
    });
});
//# sourceMappingURL=marker-manager.spec.js.map