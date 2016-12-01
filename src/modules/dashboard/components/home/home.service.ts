import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ApiService } from '../../../../services/api.service';
import { AppConfig } from '../../../../config/app.config';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HomeService {

    constructor(private apiService: ApiService) { }

    protected module: string = "weather/";
    protected weatherApiKey :string = new AppConfig().weatherApiKey;

    //to get the chart data
    getChartData(parameter?:any): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
            params.set('lat',parameter.latitude);
            params.set('lon',parameter.longitude);
            params.set('appid',this.weatherApiKey);
        return this.apiService.getWeatherData(this.module ,params)
            .then(res => res)
            .catch(err => err);
    }

}
