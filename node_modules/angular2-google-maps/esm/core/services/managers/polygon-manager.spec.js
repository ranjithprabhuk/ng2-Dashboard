import { NgZone } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { SebmGoogleMapPolygon } from '../../directives/google-map-polygon';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { PolygonManager } from './polygon-manager';
describe('PolygonManager', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgZone, useFactory: () => new NgZone({ enableLongStackTrace: true }) },
                PolygonManager, SebmGoogleMapPolygon, {
                    provide: GoogleMapsAPIWrapper,
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createPolygon'])
                }
            ]
        });
    });
    describe('Create a new polygon', () => {
        it('should call the mapsApiWrapper when creating a new polygon', inject([PolygonManager, GoogleMapsAPIWrapper], (polygonManager, apiWrapper) => {
            const newPolygon = new SebmGoogleMapPolygon(polygonManager);
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
    describe('Delete a polygon', () => {
        it('should set the map to null when deleting a existing polygon', inject([PolygonManager, GoogleMapsAPIWrapper], (polygonManager, apiWrapper) => {
            const newPolygon = new SebmGoogleMapPolygon(polygonManager);
            const polygonInstance = jasmine.createSpyObj('Polygon', ['setMap']);
            apiWrapper.createPolygon.and.returnValue(Promise.resolve(polygonInstance));
            polygonManager.addPolygon(newPolygon);
            polygonManager.deletePolygon(newPolygon).then(() => {
                expect(polygonInstance.setMap).toHaveBeenCalledWith(null);
            });
        }));
    });
});
//# sourceMappingURL=polygon-manager.spec.js.map