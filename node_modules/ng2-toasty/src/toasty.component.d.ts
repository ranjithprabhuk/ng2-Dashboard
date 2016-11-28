import { OnInit } from '@angular/core';
import { ToastyService, ToastData, ToastyConfig } from './toasty.service';
/**
 * Toasty is container for Toast components
 */
export declare class ToastyComponent implements OnInit {
    private config;
    private toastyService;
    /**
     * Set of constants defins position of Toasty on the page.
     */
    static POSITIONS: Array<String>;
    private _position;
    position: string;
    toasts: Array<ToastData>;
    constructor(config: ToastyConfig, toastyService: ToastyService);
    /**
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     */
    ngOnInit(): any;
    /**
     * Event listener of 'closeToast' event comes from ToastyComponent.
     * This method removes ToastComponent assosiated with this Toast.
     */
    closeToast(toast: ToastData): void;
    /**
     * Clear individual toast by id
     * @param id is unique identifier of Toast
     */
    clear(id: number): void;
    /**
     * Clear all toasts
     */
    clearAll(): void;
    /**
     * Custom setTimeout function for specific setTimeouts on individual toasts.
     */
    private _setTimeout(toast);
}
