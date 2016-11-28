import {Component} from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from '../../../authentication/authentication.service';

@Component({
    selector: 'dashboard-header',
    templateUrl : './view/header.html'
})

export class HeaderComponent {

    constructor(private authService: AuthenticationService,public router : Router){}

    //method to logout
    public signOut():void{
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}