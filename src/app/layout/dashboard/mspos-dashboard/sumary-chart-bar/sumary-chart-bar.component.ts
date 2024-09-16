import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
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
  selector: 'app-sumary-chart-bar',
  templateUrl: './sumary-chart-bar.component.html',
  styleUrl: './sumary-chart-bar.component.scss'
})
export class SumaryChartBarComponent implements OnChanges, OnInit {


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
      series: [{
        name: 'Numeric distribution',
        data: [110, 85, 100, 90, 85, 105, 90, 115, 95, 30]
      },
      {
        name: 'Out of stock',
        data: [67, 35, 50, 55, 40, 60, 55, 40, 60, 70]
      },
      {
        name: 'Share of stock',
        data: [45, 55, 50, 55, 40, 60, 40, 60, 30, 80]
      },
      {
        name: 'SISH',
        data: [45, 55, 50, 30, 40, 60, 20, 55, 35, 45]
      },
      ],
      colors: ['#00E396', '#FEB019', '#008FFB', '#FF4560'],
      chart: {
        height: 270,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },

      xaxis: {
        categories: ['Kinshasa', 'Province orientale', 'Kongo central', 'Grand bandundu', 'Katanga', 'Maniema', 'Grand kivu', 'Tshikapa', 'Kananga', 'Kasai oriental'],
      },
    };
  }
}
