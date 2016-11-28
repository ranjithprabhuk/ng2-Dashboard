import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'login',
    templateUrl: './view/login.html',
    providers: [AuthenticationService, NotificationsService]
})

export class LoginComponent {

    constructor(private authService: AuthenticationService, public router: Router, private _notificationsService: NotificationsService) { }

    private userDetails: Object = {};
    public isRemember: boolean = true;

    public options = {
        position: ["bottom", "left"],
        timeOut: 5000,
        lastOnBottom: true
    }

    //method to handle the sigin in
    public signIn(data: any): void {
        if (data && data.username && data.password) {
            //call the authService to chekc the credentials
            this.authService.login(data).then(res => {
                console.log("response>>", res);
                this.router.navigate(['/dashboard']);
            }).catch(err => err);
        }
    }

    public ShowAlert(): void {
        this._notificationsService.success(
            'Some Title',
            'Some Content',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
            }
        )
    }
}