import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { NDYearModel } from '../../models/nd-dashboard.models';

export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
}

@Component({
  selector: 'app-nd-by-year',
  templateUrl: './nd-by-year.component.html',
  styleUrl: './nd-by-year.component.scss'
})
export class NdByYearComponent implements OnChanges {
  @Input() ndYear: NDYearModel[] = [];
  @Input() isLoading!: boolean;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions4: Partial<ChartOptions> | any;


  ngOnChanges(changes: SimpleChanges): void {
    this.getChartByYear();
  }


  getChartByYear() {
    this.chartOptions4 = {
      series: [
        {
          name: 'Equateur',
          data: this.ndYear.map((val) => val.eq),
        },
      ],
      colors: ['#E41F07'],
      chart: {
        height: 273,
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      xaxis: {
        categories: this.ndYear.map((val) => {
          if (val.mois = '1') {
            return 'Jan';
          } else if (val.mois = '2') {
            return 'Feb';
          } else if (val.mois = '3') {
            return 'Mar';
          } else if (val.mois = '4') {
            return 'Apr';
          } else if (val.mois = '5') {
            return 'Mai';
          } else if (val.mois = '6') {
            return 'Juin';
          } else if (val.mois = '7') {
            return 'Juil';
          } else if (val.mois = '8') {
            return 'Aout';
          } else if (val.mois = '9') {
            return 'Sep';
          } else if (val.mois = '10') {
            return 'Oct';
          } else if (val.mois = '11') {
            return 'Nov';
          } else if (val.mois = '12') {
            return 'Dec';
          } else {
            return "";
          }
        }),
      },
    };
  }
}
