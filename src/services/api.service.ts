import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiService {
    private apiBase = new AppConfig().apiBase;
    private externalApiForWeather = new AppConfig().weatherApiBase;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    //for all GET operations
    get(module: string, parameter?: URLSearchParams): Promise<any> {
        return this.http
            .get(this.apiBase + module, { search: parameter, headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    //for all POST operations
    create(module: string, parameter: any): Promise<any> {
        return this.http
            .post(this.apiBase + module, JSON.stringify(parameter), this.headers)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    //for all UPDATE operations
    update(module: string, parameter: any): Promise<any> {
        return this.http
            .put(this.apiBase + module, JSON.stringify(parameter), this.headers)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    //for all DELETE operations
    delete(module: string, parameter: any): Promise<void> {
        return this.http.delete(this.apiBase + module + parameter, this.headers)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    //to get weather dta from external api
    getWeatherData(module: string, parameter?: URLSearchParams): Promise<any> {
        return this.http
            .get(this.externalApiForWeather + module, { search: parameter, headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    //for error handling
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
