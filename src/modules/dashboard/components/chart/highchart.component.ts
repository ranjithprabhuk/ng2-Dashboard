import { Component } from '@angular/core';

@Component({
    selector: 'high-chart',
    templateUrl: './view/high-chart.html',
    styleUrls: ['./styles/high-chart.css']
})

export class HighChartComponent {
    public options: Object;
    constructor() {
        this.options = {
            title: { text: 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129],
            }]
        };
    }
}