"use strict";
var core_1 = require('@angular/core');
var google_map_1 = require('./directives/google-map');
var google_map_circle_1 = require('./directives/google-map-circle');
var google_map_info_window_1 = require('./directives/google-map-info-window');
var google_map_marker_1 = require('./directives/google-map-marker');
var google_map_polygon_1 = require('./directives/google-map-polygon');
var google_map_polyline_1 = require('./directives/google-map-polyline');
var google_map_polyline_point_1 = require('./directives/google-map-polyline-point');
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
var lazy_maps_api_loader_2 = require('./services/maps-api-loader/lazy-maps-api-loader');
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
var browser_globals_1 = require('./utils/browser-globals');
/**
 * @internal
 */
function coreDirectives() {
    return [
        google_map_1.SebmGoogleMap, google_map_marker_1.SebmGoogleMapMarker, google_map_info_window_1.SebmGoogleMapInfoWindow, google_map_circle_1.SebmGoogleMapCircle,
        google_map_polygon_1.SebmGoogleMapPolygon, google_map_polyline_1.SebmGoogleMapPolyline, google_map_polyline_point_1.SebmGoogleMapPolylinePoint
    ];
}
exports.coreDirectives = coreDirectives;
;
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = (function () {
    function AgmCoreModule() {
    }
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: browser_globals_1.BROWSER_GLOBALS_PROVIDERS.concat([
                { provide: maps_api_loader_1.MapsAPILoader, useClass: lazy_maps_api_loader_1.LazyMapsAPILoader },
                { provide: lazy_maps_api_loader_2.LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }
            ]),
        };
    };
    AgmCoreModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] },
    ];
    /** @nocollapse */
    AgmCoreModule.ctorParameters = [];
    return AgmCoreModule;
}());
exports.AgmCoreModule = AgmCoreModule;
//# sourceMappingURL=core-module.js.map