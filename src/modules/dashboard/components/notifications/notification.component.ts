import { Component } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { NotificationConfig } from '../../../../config/notification.config';

@Component({
    selector: 'notification',
    templateUrl: './view/simple-notification.html',
    providers: [NotificationsService, NotificationConfig]
})

export class SimpleNotificationComponent {
    constructor(private _notificationsService: NotificationsService, public options: NotificationConfig) { }

    //initial values
    public title: string = 'Title';
    public content: string = 'Some Content';


    //method to display the alert based on the alert type requested by the user
    public showAlert(type: string): void {
        switch (type) {
            case 'success':
                this._notificationsService.success(this.title, this.content, this.options); break;
            case 'info':
                this._notificationsService.info(this.title, this.content, this.options); break;
            case 'alert':
                this._notificationsService.alert(this.title, this.content, this.options); break;
            case 'error':
                this._notificationsService.error(this.title, this.content, this.options); break;
            case 'bare':
                this._notificationsService.bare(this.title, this.content, this.options); break;
            case 'html':
                this._notificationsService.html(this.title, this.content, this.options); break;
            default: break;
        }

    }

    //method to display the alert
    public clearAlert(): void {
        this._notificationsService.remove();
    }
}