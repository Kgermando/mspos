import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts'; 
import { SOSPieModel } from '../../models/summary-dashboard.model';
export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
}


@Component({
  selector: 'app-sos-pie',
  templateUrl: './sos-pie.component.html',
  styleUrl: './sos-pie.component.scss'
})
export class SosPieComponent implements OnChanges {
  @Input() isLoading!: boolean;
  @Input() sosPieLIst: SOSPieModel[] = [];

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
      series: this.sosPieLIst.map((val) => val.Eq),
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
      labels: this.sosPieLIst.map((val) => val.Province),
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