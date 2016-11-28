import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';
import { MapsAPILoader } from './maps-api-loader';
export var GoogleMapsScriptProtocol;
(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
export const LAZY_MAPS_API_CONFIG = new OpaqueToken('angular2-google-maps LAZY_MAPS_API_CONFIG');
export class LazyMapsAPILoader extends MapsAPILoader {
    constructor(config, w, d) {
        super();
        this._config = config || {};
        this._windowRef = w;
        this._documentRef = d;
    }
    load() {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        const script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName = `angular2GoogleMapsLazyMapsAPILoader`;
        script.src = this._getScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            this._windowRef.getNativeWindow()[callbackName] = () => { resolve(); };
            script.onerror = (error) => { reject(error); };
        });
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    }
    _getScriptSrc(callbackName) {
        let protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        let protocol;
        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        const hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        const queryParams = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        const params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            // join arrays as comma seperated strings
            let i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => { return `${entry.key}=${entry.value}`; })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
LazyMapsAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LazyMapsAPILoader.ctorParameters = [
    { type: undefined, decorators: [{ type: Inject, args: [LAZY_MAPS_API_CONFIG,] },] },
    { type: WindowRef, },
    { type: DocumentRef, },
];
//# sourceMappingURL=lazy-maps-api-loader.js.map