import {Component} from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
    selector: 'app',
    templateUrl : 'app/modules/dashboard/components/notifications/view/toasty.html'
})
export class ToastyComponent {

    constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig. 
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'material';
    }

    addToast() {
        // Just add default Toast with title only
        this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.info(toastOptions);
        this.toastyService.success(toastOptions);
        this.toastyService.wait(toastOptions);
        this.toastyService.error(toastOptions);
        this.toastyService.warning(toastOptions);
    }
}