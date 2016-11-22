import { Component } from '@angular/core';
import 'chartjs';
import { ChartService } from './chart.services';

@Component({
  selector: 'ng2-chart',
  templateUrl: 'app/modules/dashboard/components/chart/view/ng2-chart.html',
  providers: [ChartService]
})

export class Ng2ChartComponent {

  constructor(private chartService: ChartService) { }

  //for all charts
  public chartOptions: any = {
    animation: { duration: 500, easing: "linear" },
    responsive: true
  };
  public chartLegend: boolean = true;
  // lineChart
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartType: string = 'line';

  //bar chart
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartData: Array<any>;

  // Doughnut
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartType: string = 'doughnut';

  // Radar
  public radarChartLabels: string[];
  public radarChartData: any;
  public radarChartType: string = 'radar';

  // Pie
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[];
  public polarAreaChartData: number[];
  public polarAreaChartType: string = 'polarArea';


  // method to call on click events for all charts
  public chartClicked(e: any): void {
    //console.log(e);
  }

  //method to call on chart hover for all charts
  public chartHovered(e: any): void {
    //console.log(e);
  }

  //method to generate random data to the line chart
  public generateRandomLineChartData(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  //method to generate random data to the bar chart
  public generateRandomBarChartData(): void {
    let _barChartData: Array<any> = new Array(this.barChartData.length);
    for (let i = 0; i < this.barChartData.length; i++) {
      _barChartData[i] = { data: new Array(this.barChartData[i].data.length), label: this.barChartData[i].label };
      for (let j = 0; j < this.barChartData[i].data.length; j++) {
        _barChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.barChartData = _barChartData;
  }

  //method to change the line chart
  public changeLineChart(type: string): void {
    this.lineChartType = type;
  }

  //method to change the bar chart
  public changeBarChart(type: string): void {
    this.barChartType = type;
  }

  //method to change the doughnut chart
  public changeDoughnutChart(type: string): void {
    this.doughnutChartType = type;
  }

  //method to change the radar chart
  public changeRadarChart(type: string): void {
    this.radarChartType = type;
  }

  //method to change the pie chart
  public changepieChart(type: string): void {
    this.pieChartType = type;
  }

  //method to change the polar chart
  public changePolarChart(type: string): void {
    this.polarAreaChartType = type;
  }


  //get the line chart data from the api
  public _getLineChartData(): void {
    //call the chart service to get the data
    this.chartService.getChartData("ng2-chart/lineChart.json").then(res => {
      //map the data
      this.lineChartData = res.lineChartData;
      //map the line chart labels
      this.lineChartLabels = res.lineChartLabels;
    }).catch(err => err);
  }

  //get the bar chart data from the api
  public _getBarChartData(): void {
    //call the chart service to get the data
    this.chartService.getChartData("ng2-chart/barChart.json").then(res => {
      //map the data
      this.barChartData = res.barChartData;
      //map chart labels
      this.barChartLabels = res.barChartLabels;
    }).catch(err => err);
  }

  //get the doughnut chart data from the api
  public _getDoughnutChartData(): void {
    //call the chart service to get the data
    this.chartService.getChartData("ng2-chart/doughnutChart.json").then(res => {
      //map the data
      this.doughnutChartData = res.doughnutChartData;
      //map the chart labels
      this.doughnutChartLabels = res.doughnutChartLabels;
    }).catch(err => err);
  }

  //get the pie chart data from the api
  public _getPieChartData(): void {
    //call the chart service to get the data
    this.chartService.getChartData("ng2-chart/pieChart.json").then(res => {
      //map the data
      this.pieChartData = res.pieChartData;
      //map the chart labels
      this.pieChartLabels = res.pieChartLabels;
    }).catch(err => err);
  }

  //get the radar chart data from the api
  public _getRadarChartData(): void {
    //call the chart service to get the data
    this.chartService.getChartData("ng2-chart/radarChart.json").then(res => {
      //map the data
      this.radarChartData = res.radarChartData;
      //map the chart labels
      this.radarChartLabels = res.radarChartLabels;
    }).catch(err => err);
  }

  //get the polar chart data from the api
  public _getpolarAreaChartData(): void {
    //call the chart service to get the data
    this.chartService.getChartData("ng2-chart/polarAreaChart.json").then(res => {
      //map the data
      this.polarAreaChartData = res.polarAreaChartData;
      //map the chart labels
      this.polarAreaChartLabels = res.polarAreaChartLabels;
    }).catch(err => err);
  }


  //on page load
  ngOnInit() {

    //call the methods to get the data from the api
    this._getLineChartData();
    this._getBarChartData();
    this._getDoughnutChartData();
    this._getPieChartData();
    this._getRadarChartData();
    this._getpolarAreaChartData();

  }
}