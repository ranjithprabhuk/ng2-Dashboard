import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ApiService } from '../../../../services/api.service';
import { AppConfig } from '../../../../config/app.config';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HomeService {

    constructor(private apiService: ApiService) { }

    protected module: string = "weather/";

}
