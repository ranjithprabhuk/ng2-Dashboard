"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('chartjs');
var chart_service_1 = require('./chart.service');
var Ng2ChartComponent = (function () {
    function Ng2ChartComponent(chartService) {
        this.chartService = chartService;
        //for all charts
        this.chartOptions = {
            animation: { duration: 500, easing: "linear" },
            responsive: true
        };
        this.chartLegend = true;
        this.lineChartType = 'line';
        this.barChartType = 'bar';
        this.doughnutChartType = 'doughnut';
        this.radarChartType = 'radar';
        this.pieChartType = 'pie';
        this.polarAreaChartType = 'polarArea';
    }
    // method to call on click events for all charts
    Ng2ChartComponent.prototype.chartClicked = function (e) {
        //console.log(e);
    };
    //method to call on chart hover for all charts
    Ng2ChartComponent.prototype.chartHovered = function (e) {
        //console.log(e);
    };
    //method to generate random data to the line chart
    Ng2ChartComponent.prototype.generateRandomLineChartData = function () {
        var _lineChartData = new Array(this.lineChartData.length);
        for (var i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (var j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    };
    //method to generate random data to the bar chart
    Ng2ChartComponent.prototype.generateRandomBarChartData = function () {
        var _barChartData = new Array(this.barChartData.length);
        for (var i = 0; i < this.barChartData.length; i++) {
            _barChartData[i] = { data: new Array(this.barChartData[i].data.length), label: this.barChartData[i].label };
            for (var j = 0; j < this.barChartData[i].data.length; j++) {
                _barChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.barChartData = _barChartData;
    };
    //method to change the line chart
    Ng2ChartComponent.prototype.changeLineChart = function (type) {
        this.lineChartType = type;
    };
    //method to change the bar chart
    Ng2ChartComponent.prototype.changeBarChart = function (type) {
        this.barChartType = type;
    };
    //method to change the doughnut chart
    Ng2ChartComponent.prototype.changeDoughnutChart = function (type) {
        this.doughnutChartType = type;
    };
    //method to change the radar chart
    Ng2ChartComponent.prototype.changeRadarChart = function (type) {
        this.radarChartType = type;
    };
    //method to change the pie chart
    Ng2ChartComponent.prototype.changepieChart = function (type) {
        this.pieChartType = type;
    };
    //method to change the polar chart
    Ng2ChartComponent.prototype.changePolarChart = function (type) {
        this.polarAreaChartType = type;
    };
    //get the line chart data from the api
    Ng2ChartComponent.prototype._getLineChartData = function () {
        var _this = this;
        //call the chart service to get the data
        this.chartService.getChartData("ng2-chart/lineChart.json").then(function (res) {
            //map the data
            _this.lineChartData = res.lineChartData;
            //map the line chart labels
            _this.lineChartLabels = res.lineChartLabels;
        }).catch(function (err) { return err; });
    };
    //get the bar chart data from the api
    Ng2ChartComponent.prototype._getBarChartData = function () {
        var _this = this;
        //call the chart service to get the data
        this.chartService.getChartData("ng2-chart/barChart.json").then(function (res) {
            //map the data
            _this.barChartData = res.barChartData;
            //map chart labels
            _this.barChartLabels = res.barChartLabels;
        }).catch(function (err) { return err; });
    };
    //get the doughnut chart data from the api
    Ng2ChartComponent.prototype._getDoughnutChartData = function () {
        var _this = this;
        //call the chart service to get the data
        this.chartService.getChartData("ng2-chart/doughnutChart.json").then(function (res) {
            //map the data
            _this.doughnutChartData = res.doughnutChartData;
            //map the chart labels
            _this.doughnutChartLabels = res.doughnutChartLabels;
        }).catch(function (err) { return err; });
    };
    //get the pie chart data from the api
    Ng2ChartComponent.prototype._getPieChartData = function () {
        var _this = this;
        //call the chart service to get the data
        this.chartService.getChartData("ng2-chart/pieChart.json").then(function (res) {
            //map the data
            _this.pieChartData = res.pieChartData;
            //map the chart labels
            _this.pieChartLabels = res.pieChartLabels;
        }).catch(function (err) { return err; });
    };
    //get the radar chart data from the api
    Ng2ChartComponent.prototype._getRadarChartData = function () {
        var _this = this;
        //call the chart service to get the data
        this.chartService.getChartData("ng2-chart/radarChart.json").then(function (res) {
            //map the data
            _this.radarChartData = res.radarChartData;
            //map the chart labels
            _this.radarChartLabels = res.radarChartLabels;
        }).catch(function (err) { return err; });
    };
    //get the polar chart data from the api
    Ng2ChartComponent.prototype._getpolarAreaChartData = function () {
        var _this = this;
        //call the chart service to get the data
        this.chartService.getChartData("ng2-chart/polarAreaChart.json").then(function (res) {
            //map the data
            _this.polarAreaChartData = res.polarAreaChartData;
            //map the chart labels
            _this.polarAreaChartLabels = res.polarAreaChartLabels;
        }).catch(function (err) { return err; });
    };
    //on page load
    Ng2ChartComponent.prototype.ngOnInit = function () {
        //call the methods to get the data from the api
        this._getLineChartData();
        this._getBarChartData();
        this._getDoughnutChartData();
        this._getPieChartData();
        this._getRadarChartData();
        this._getpolarAreaChartData();
    };
    Ng2ChartComponent = __decorate([
        core_1.Component({
            selector: 'ng2-chart',
            templateUrl: 'app/modules/dashboard/components/chart/view/ng2-chart.html',
            providers: [chart_service_1.ChartService]
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService])
    ], Ng2ChartComponent);
    return Ng2ChartComponent;
}());
exports.Ng2ChartComponent = Ng2ChartComponent;
//# sourceMappingURL=ng2-chart.component.js.map