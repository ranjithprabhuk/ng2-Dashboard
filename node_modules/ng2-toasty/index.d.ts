import { ModuleWithProviders } from "@angular/core";
export * from './src/toasty.service';
export * from './src/toasty.component';
import { ToastyComponent } from './src/toasty.component';
import { ToastComponent } from './src/toast.component';
import { ToastyConfig, ToastyService } from './src/toasty.service';
declare var _default: {
    providers: (typeof ToastyConfig | typeof ToastyService)[];
    directives: (typeof ToastyComponent | typeof ToastComponent)[];
};
export default _default;
export declare class ToastyModule {
    static forRoot(): ModuleWithProviders;
}
