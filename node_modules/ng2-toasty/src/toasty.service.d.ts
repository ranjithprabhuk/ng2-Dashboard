import { Observable } from 'rxjs/Observable';
/**
 * Options to configure specific Toast
 */
export interface ToastOptions {
    title: string;
    msg?: string;
    showClose?: boolean;
    theme?: string;
    timeout?: number;
    onAdd?: Function;
    onRemove?: Function;
}
/**
 * Structrure of Toast
 */
export interface ToastData {
    id: number;
    title: string;
    msg: string;
    showClose: boolean;
    type: string;
    theme: string;
    timeout: number;
    onAdd: Function;
    onRemove: Function;
    onClick: Function;
}
/**
 * Default configuration foa all toats and toasty container
 */
export declare class ToastyConfig {
    limit: number;
    showClose: boolean;
    position: string;
    timeout: number;
    theme: string;
}
/**
 * Toasty service helps create different kinds of Toasts
 */
export declare class ToastyService {
    private config;
    static THEMES: Array<string>;
    uniqueCounter: number;
    private toastsEmitter;
    private clearEmitter;
    constructor(config: ToastyConfig);
    /**
     * Get list of toats
     */
    getToasts(): Observable<ToastData>;
    getClear(): Observable<number>;
    /**
     * Create Toast of a default type
     */
    default(options: ToastOptions | string | number): void;
    /**
     * Create Toast of info type
     * @param  {object} options Individual toasty config overrides
     */
    info(options: ToastOptions | string | number): void;
    /**
     * Create Toast of success type
     * @param  {object} options Individual toasty config overrides
     */
    success(options: ToastOptions | string | number): void;
    /**
     * Create Toast of wait type
     * @param  {object} options Individual toasty config overrides
     */
    wait(options: ToastOptions | string | number): void;
    /**
     * Create Toast of error type
     * @param  {object} options Individual toasty config overrides
     */
    error(options: ToastOptions | string | number): void;
    /**
     * Create Toast of warning type
     * @param  {object} options Individual toasty config overrides
     */
    warning(options: ToastOptions | string | number): void;
    private add(options, type);
    clearAll(): void;
    clear(id: number): void;
    private _checkConfigItem(config, options, property);
}
