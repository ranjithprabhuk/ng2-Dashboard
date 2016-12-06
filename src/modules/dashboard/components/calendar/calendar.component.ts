import { Component } from '@angular/core';

@Component({
    selector: 'event-calendar',
    templateUrl: './view/calendar.html',
    styleUrls:['./styles/angular2-calendar.css']
})

export class CalendarComponent {
    viewDate: Date = new Date();
    events = [];
}