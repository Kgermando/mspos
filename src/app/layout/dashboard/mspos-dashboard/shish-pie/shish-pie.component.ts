import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts'; 
export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
}

@Component({
  selector: 'app-shish-pie',
  templateUrl: './shish-pie.component.html',
  styleUrl: './shish-pie.component.scss'
})
export class ShishPieComponent implements OnChanges {
 

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions3: Partial<ChartOptions> | any;


  ngOnInit(): void {
    this.getChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getChart();
  }

  getChart() {
    this.chartOptions3 = {
      series: [44, 55, 13, 43],
      chart: {
        width: 400,
        type: 'pie',
      },
      legend: {
        position: 'bottom',
        formatter: function (val: any, opts: any) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      labels: ['Inpipeline', 'Follow Up', 'Schedule Service', 'Conversation'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 275,
            },
            legend: {
              position: 'right',
            },
          },
        },
      ],
    };
  }
}
