import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { NDAverageModel, TableViewModel, } from '../../models/nd-dashboard.models';

export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
}

@Component({
  selector: 'app-nd-average-area',
  templateUrl: './nd-average-area.component.html',
  styleUrl: './nd-average-area.component.scss'
})
export class NdAverageAreaComponent implements OnChanges {

  @Input() averageAreaList: TableViewModel[] = [];
  @Input() isLoading!: boolean;
  @Input() areaCount!: number

  averages: NDAverageModel[] = [];

  Eq = 0;
  Dhl = 0;
  Ar = 0;
  Sbl = 0;
  Pmf = 0;
  Pmm = 0;
  Ticket = 0;
  Mtc = 0;
  Ws = 0;
  Mast = 0;
  Oris = 0;
  Elite = 0;
  Yes = 0;
  Time = 0;


  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions3: Partial<ChartOptions> | any;

  ngOnChanges(changes: SimpleChanges): void {
    this.averages = [];
    this.calculAverage();
    this.getByAverage();
    this.averages = [];
  }

  calculAverage() {
    if (this.averageAreaList.length > 0) {
      for (let index = 0; index < this.averageAreaList.length; index++) {
        this.Eq = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Eq;
        }, 0);
        var eq = 0;
        if (this.Eq > 0) {
          eq = this.Eq / this.areaCount;
        }
        this.averages.push({ x: 'Eq', y: eq });

        this.Dhl = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Dhl;
        }, 0);
        var dhl = 0;
        if (this.Dhl > 0) {
          dhl = this.Dhl / this.areaCount;
        }
        this.averages.push({ x: 'Dhl', y: dhl });

        this.Ar = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Ar;
        }, 0);
        var ar = 0;
        if (this.Ar > 0) {
          ar = this.Ar / this.areaCount;
        }
        this.averages.push({ x: 'Ar', y: ar });

        this.Sbl = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Sbl;
        }, 0);
        var sbl = 0;
        if (this.Sbl > 0) {
          sbl = this.Sbl / this.areaCount;
        }
        this.averages.push({ x: 'Sbl', y: sbl });

        this.Pmf = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Pmf;
        }, 0);
        var pmf = 0;
        if (this.Pmf > 0) {
          pmf = this.Pmf / this.areaCount;
        }
        this.averages.push({ x: 'Pmf', y: pmf });

        this.Pmm = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Pmm;
        }, 0);
        var pmm = 0;
        if (this.Pmm > 0) {
          pmm = this.Pmm / this.areaCount;
        }
        this.averages.push({ x: 'Pmm', y: pmm });

        this.Ticket = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Ticket;
        }, 0);
        var ticket = 0;
        if (this.Ticket > 0) {
          ticket = this.Ticket / this.areaCount;
        }
        this.averages.push({ x: 'Ticket', y: ticket });

        this.Mtc = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Mtc;
        }, 0);
        var mtc = 0;
        if (this.Mtc > 0) {
          mtc = this.Mtc / this.areaCount;
        }
        this.averages.push({ x: 'Mtc', y: mtc });

        this.Ws = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Ws;
        }, 0);
        var ws = 0;
        if (this.Ws > 0) {
          ws = this.Ws / this.areaCount;
        }
        this.averages.push({ x: 'Ws', y: ws });

        this.Mast = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Mast;
        }, 0);
        var mast = 0;
        if (this.Mast > 0) {
          mast = this.Mast / this.areaCount;
        }
        this.averages.push({ x: 'Mast', y: mast });

        this.Oris = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Oris;
        }, 0);
        var oris = 0;
        if (this.Oris > 0) {
          oris = this.Oris / this.areaCount;
        }
        this.averages.push({ x: 'Oris', y: oris });

        this.Elite = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Elite;
        }, 0);
        var elite = 0;
        if (this.Elite > 0) {
          elite = this.Elite / this.areaCount;
        }
        this.averages.push({ x: 'Elite', y: elite });

        this.Yes = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Yes;
        }, 0);
        var yes = 0;
        if (this.Yes > 0) {
          yes = this.Yes / this.areaCount;
        }
        this.averages.push({ x: 'Yes', y: yes });

        this.Time = this.averageAreaList.reduce(function (sum, value) {
          return sum + value.Time;
        }, 0);
        var time = 0;
        if (this.Time > 0) {
          time = this.Time / this.areaCount;
        }
        this.averages.push({ x: 'Time', y: time });
      }
    } else {
      this.averages = [];
    }

  }


  getByAverage() {
    this.chartOptions3 = {
      series: [
        {
          name: 'Brand',
          colors: ['#FFC38F'],
          data: this.averages,
        },
      ],
      colors: ['#00918E'],
      chart: {
        type: 'bar',
        height: 275,
      },
      plotOptions: {
        bar: {
          borderRadiusApplication: 'around',
          columnWidth: '40%',
        },
      },
      xaxis: {
        type: 'category',
        group: {
          style: {
            fontSize: '7px',
            fontWeight: 700,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
      }
    };
  }
}
