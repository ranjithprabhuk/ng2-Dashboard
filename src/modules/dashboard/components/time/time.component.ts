import { Component, Attribute } from '@angular/core';

@Component({
    selector: 'live-time',
    templateUrl: './view/time.html',
    styleUrls:['./styles/time.css']
})

export class TimeComponent {
    private dateValue;

    constructor() {
        //set the date valaue 
        this.dateValue = new Date();

        //set the new time for each and every second
        setInterval(() => {
            this.dateValue = new Date();
        }, 1000);
    }

} 