import { ModuleWithProviders } from '@angular/core';
import { SebmGoogleMap } from './directives/google-map';
import { SebmGoogleMapCircle } from './directives/google-map-circle';
import { SebmGoogleMapInfoWindow } from './directives/google-map-info-window';
import { SebmGoogleMapMarker } from './directives/google-map-marker';
import { SebmGoogleMapPolygon } from './directives/google-map-polygon';
import { SebmGoogleMapPolyline } from './directives/google-map-polyline';
import { SebmGoogleMapPolylinePoint } from './directives/google-map-polyline-point';
import { LazyMapsAPILoaderConfigLiteral } from './services/maps-api-loader/lazy-maps-api-loader';
/**
 * @internal
 */
export declare function coreDirectives(): (typeof SebmGoogleMapCircle | typeof SebmGoogleMapMarker | typeof SebmGoogleMapInfoWindow | typeof SebmGoogleMapPolygon | typeof SebmGoogleMapPolylinePoint | typeof SebmGoogleMapPolyline | typeof SebmGoogleMap)[];
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
export declare class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig?: LazyMapsAPILoaderConfigLiteral): ModuleWithProviders;
}
