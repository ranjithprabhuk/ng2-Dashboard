import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ApiService } from '../../../../services/api.service';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class WeatherService {

    constructor(private apiService: ApiService) { }

    protected module: string = "chart/";

    //to get the chart data
    getChartData(endPoint:string,parameter?:any): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
            params.set('','');
        return this.apiService.get(this.module + endPoint,params)
            .then(res => res)
            .catch(err => err);
    }

}
