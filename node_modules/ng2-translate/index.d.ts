import { ModuleWithProviders } from "@angular/core";
import { Http } from "@angular/http";
import { TranslateStaticLoader } from "./src/translate.service";
export * from "./src/translate.pipe";
export * from "./src/translate.service";
export * from "./src/translate.parser";
export declare function translateLoaderFactory(http: Http): TranslateStaticLoader;
export declare class TranslateModule {
    static forRoot(providedLoader?: any): ModuleWithProviders;
}
