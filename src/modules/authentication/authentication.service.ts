import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthenticationService {

    protected authEndPoint: string = "authentication/signIn.json";

    constructor(private apiService: ApiService) { }

    //to check the login credentials
    login(parameter?: any): Promise<any> {
        return this.apiService.get(this.authEndPoint)
            .then(res => {
                if (res) {
                    localStorage.setItem('auth_token', res.auth_token);
                    return res;
                }
            }).catch(err => err);
    }

    //to logou from the system
    logout(): void {
        localStorage.removeItem('auth_token');
    }

    //to check the login status
    checkLogin(): boolean {
        return !!localStorage.getItem('auth_token');
    }
}

