import { Component } from '@angular/core';
import { ChartService } from './chart.service';

@Component({
    selector: 'high-chart',
    templateUrl: './view/high-chart.html',
    styleUrls: ['./styles/high-chart.css'],
    providers: [ChartService]
})

export class HighChartComponent {

    public simpleLineChart: Object;
    public stockChart: Object;
    constructor(private chartService: ChartService) { }

    //get chart simple chart data
    public _getLineChartData(): void {
        this.chartService.getChartData('highchart/simple-line-chart.json').then(res => {
            if (res)
                this.simpleLineChart = res;
        });
    }

    //get chart stock chart data
    public _getStockChartData(): void {
        this.chartService.getChartData('highchart/stock-chart.json').then(res => {
            if (res) {
                this.stockChart = {
                    title: { text: 'AAPL Stock Price' },
                    series: [{
                        name: 'AAPL',
                        data: res,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                };
            }
        });
    }



    ngOnInit() {

        //call the api on page load
        this._getLineChartData();
        this._getStockChartData();
    }

}