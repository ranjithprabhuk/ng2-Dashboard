import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'Rxjs/Rx';

import { AppConfig } from '../../app.config';

@Injectable()
export class Ng2ChartService{
    
    constructor(private http:Http){}

    getLineChartData(path:string) : Observable<any> {
         return this.http.get(AppConfig.apiBase+path).map((res:Response) => res.json())
        .catch((err:any) => Observable.throw(err));
    }
}