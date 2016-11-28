"use strict";
var testing_1 = require('@angular/core/testing');
var browser_globals_1 = require('../../utils/browser-globals');
var lazy_maps_api_loader_1 = require('./lazy-maps-api-loader');
var maps_api_loader_1 = require('./maps-api-loader');
describe('Service: LazyMapsAPILoader', function () {
    var documentRef;
    var doc;
    var windowRef;
    beforeEach(function () {
        doc = jasmine.createSpyObj('Document', ['createElement']);
        documentRef = jasmine.createSpyObj('Document', ['getNativeDocument']);
        documentRef.getNativeDocument.and.returnValue(doc);
        windowRef = {};
    });
    it('should create the default script URL', function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: maps_api_loader_1.MapsAPILoader, useClass: lazy_maps_api_loader_1.LazyMapsAPILoader },
                { provide: browser_globals_1.WindowRef, useValue: windowRef }, { provide: browser_globals_1.DocumentRef, useValue: documentRef }
            ]
        });
        testing_1.inject([maps_api_loader_1.MapsAPILoader], function (loader) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            doc.body = jasmine.createSpyObj('body', ['appendChild']);
            loader.load();
            expect(doc.createElement).toHaveBeenCalled();
            expect(scriptElem.type).toEqual('text/javascript');
            expect(scriptElem.async).toEqual(true);
            expect(scriptElem.defer).toEqual(true);
            expect(scriptElem.src).toBeDefined();
            expect(scriptElem.src).toContain('https://maps.googleapis.com/maps/api/js');
            expect(scriptElem.src).toContain('v=3');
            expect(scriptElem.src).toContain('callback=angular2GoogleMapsLazyMapsAPILoader');
            expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        });
    });
    it('should load the script via http when provided', function () {
        var lazyLoadingConf = { protocol: lazy_maps_api_loader_1.GoogleMapsScriptProtocol.HTTP };
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: maps_api_loader_1.MapsAPILoader, useClass: lazy_maps_api_loader_1.LazyMapsAPILoader },
                { provide: browser_globals_1.WindowRef, useValue: windowRef }, { provide: browser_globals_1.DocumentRef, useValue: documentRef },
                { provide: lazy_maps_api_loader_1.LAZY_MAPS_API_CONFIG, useValue: lazyLoadingConf }
            ]
        });
        testing_1.inject([maps_api_loader_1.MapsAPILoader], function (loader) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            doc.body = jasmine.createSpyObj('body', ['appendChild']);
            loader.load();
            expect(doc.createElement).toHaveBeenCalled();
            expect(scriptElem.src).toContain('http://maps.googleapis.com/maps/api/js');
            expect(scriptElem.src).toContain('v=3');
            expect(scriptElem.src).toContain('callback=angular2GoogleMapsLazyMapsAPILoader');
            expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        });
    });
});
//# sourceMappingURL=lazy-maps-api-loader.spec.js.map