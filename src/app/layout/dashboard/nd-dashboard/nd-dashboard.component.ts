import { Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexTooltip,
  ApexLegend,
  ApexStroke,
} from 'ng-apexcharts';
import { routes } from '../../../shared/routes/routes';
import { ProvinceService } from '../../province/province.service';
import { AreaService } from '../../areas/area.service';
import { CommonService } from '../../../shared/common/common.service';
import { IProvince } from '../../province/models/province.model';
import { IArea } from '../../areas/models/area.model';
import { NdService } from '../services/nd.service';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { NDAverage, NDDashboardByArea, NDDashboardTableView } from '../models/nd-dashboard.models';


export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
}


export type ChartOptionPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  labels: any;
  colors: any;
};


@Component({
  selector: 'app-nd-dashboard',
  templateUrl: './nd-dashboard.component.html',
  styleUrl: './nd-dashboard.component.scss'
})
export class NdDashboardComponent implements OnInit {
  public routes = routes;
  date = new Date();
  startDate = new Date();
  endDate = new Date();
  rangeValue!: Date[];

  public rangeDate!: FormControl;
  public debounce: number = 400;


  provinceName = 'kinshasa'
  start_date!: string;
  end_date!: string;

  base = '';
  page = '';
  last = '';

  provinceList: IProvince[] = [];
  province!: IProvince;
  areaList: IArea[] = [];
  areaListFilter: IArea[] = [];
  areaCount = 0;

  tableView: NDDashboardTableView[] = [];
  tableArea: NDDashboardByArea[] = [];
  area!: IArea;
  averages: NDAverage[] = [];
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
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;

  constructor(
    private common: CommonService,
    private renderer: Renderer2,
    private ndService: NdService,
    private provinceService: ProvinceService,
    private areaService: AreaService
  ) {

    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    if (this.last == 'nd-dashboard') {
      this.renderer.addClass(document.body, 'date-picker-dashboard');
    }
  }





  ngOnInit(): void {
    const start_date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    const endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    console.log("Date select", start_date, endDate)

    this.provinceService.getAll().subscribe(res => {
      this.provinceList = res.data;
    });
    this.areaService.getAll().subscribe(res => {
      this.areaList = res.data;
      this.areaCount = res.meta.total;

      console.log("areaCount", this.areaCount)
    });

    this.rangeValue = [start_date, endDate];
    // Init date
    this.start_date = formatDate(this.rangeValue[0], 'yyyy-MM-dd', 'en-US');
    this.end_date = formatDate(this.rangeValue[1], 'yyyy-MM-dd', 'en-US');

    // Select date change
    this.rangeDate = new FormControl(this.rangeValue);
    this.rangeDate.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        this.start_date = formatDate(query[0], 'yyyy-MM-dd', 'en-US');
        this.end_date = formatDate(query[1], 'yyyy-MM-dd', 'en-US');
        console.log("rangeValue 2", this.start_date, this.end_date)
      });

    this.ndService.tableView(this.provinceName, this.start_date, this.end_date).subscribe((res) => {
      this.tableView = res.data;
      console.log("tableView 2", this.tableView)

      for (let index = 0; index < this.tableView.length; index++) {
        const element = this.tableView[index];
        this.Eq = this.tableView.reduce(function (sum, value) {
          return sum + value.Eq;
        }, 0);
        var eq = 0;
        if (this.Eq > 0) {
          eq = this.Eq / this.areaCount;
        }
        this.averages.push({ x: 'Eq', y: eq });

        this.Dhl = this.tableView.reduce(function (sum, value) {
          return sum + value.Dhl;
        }, 0);
        var dhl = 0;
        if (this.Dhl > 0) {
          dhl = this.Dhl / this.areaCount;
        }
        this.averages.push({ x: 'Dhl', y: dhl });

        this.Ar = this.tableView.reduce(function (sum, value) {
          return sum + value.Ar;
        }, 0);
        var ar = 0;
        if (this.Ar > 0) {
          ar = this.Ar / this.areaCount;
        }
        this.averages.push({ x: 'Ar', y: ar });

        this.Sbl = this.tableView.reduce(function (sum, value) {
          return sum + value.Sbl;
        }, 0);
        var sbl = 0;
        if (this.Sbl > 0) {
          sbl = this.Sbl / this.areaCount;
        }
        this.averages.push({ x: 'Sbl', y: sbl });

        this.Pmf = this.tableView.reduce(function (sum, value) {
          return sum + value.Pmf;
        }, 0);
        var pmf = 0;
        if (this.Pmf > 0) {
          pmf = this.Pmf / this.areaCount;
        }
        this.averages.push({ x: 'Pmf', y: pmf });

        this.Pmm = this.tableView.reduce(function (sum, value) {
          return sum + value.Pmm;
        }, 0);
        var pmm = 0;
        if (this.Pmm > 0) {
          pmm = this.Pmm / this.areaCount;
        }
        this.averages.push({ x: 'Pmm', y: pmm });

        this.Ticket = this.tableView.reduce(function (sum, value) {
          return sum + value.Ticket;
        }, 0);
        var ticket = 0;
        if (this.Ticket > 0) {
          ticket = this.Ticket / this.areaCount;
        }
        this.averages.push({ x: 'Ticket', y: ticket });

        this.Mtc = this.tableView.reduce(function (sum, value) {
          return sum + value.Mtc;
        }, 0);
        var mtc = 0;
        if (this.Mtc > 0) {
          mtc = this.Mtc / this.areaCount;
        }
        this.averages.push({ x: 'Mtc', y: mtc });

        this.Ws = this.tableView.reduce(function (sum, value) {
          return sum + value.Ws;
        }, 0);
        var ws = 0;
        if (this.Ws > 0) {
          ws = this.Ws / this.areaCount;
        }
        this.averages.push({ x: 'Ws', y: ws });

        this.Mast = this.tableView.reduce(function (sum, value) {
          return sum + value.Mast;
        }, 0);
        var mast = 0;
        if (this.Mast > 0) {
          mast = this.Mast / this.areaCount;
        }
        this.averages.push({ x: 'Mast', y: mast });

        this.Oris = this.tableView.reduce(function (sum, value) {
          return sum + value.Oris;
        }, 0);
        var oris = 0;
        if (this.Oris > 0) {
          oris = this.Oris / this.areaCount;
        }
        this.averages.push({ x: 'Oris', y: oris });

        this.Elite = this.tableView.reduce(function (sum, value) {
          return sum + value.Elite;
        }, 0);
        var elite = 0;
        if (this.Elite > 0) {
          elite = this.Elite / this.areaCount;
        }
        this.averages.push({ x: 'Elite', y: this.Elite });

        this.Yes = this.tableView.reduce(function (sum, value) {
          return sum + value.Yes;
        }, 0);
        var yes = 0;
        if (this.Yes > 0) {
          yes = this.Yes / this.areaCount;
        }
        this.averages.push({ x: 'Yes', y: yes });

        this.Time = this.tableView.reduce(function (sum, value) {
          return sum + value.Time;
        }, 0);
        var time = 0;
        if (this.Time > 0) {
          time = this.Time / this.areaCount;
        }
        this.averages.push({ x: 'Time', y: this.Time });
      }

     

    });

    if (!this.area) {
      this.ndService.posByArea(this.provinceName, 'Funa', this.start_date, this.end_date).subscribe((res) => {
        this.tableArea = res.data;
        console.log("tableArea 2", this.tableArea)
      });
    }

    this.getByAverage();

    this.getPerformanceEQ();

    this.getChartByYear();
  }



  onProvinceChange(event: any) {
    const name = this.provinceList.find((v) => v.ID == event.value)?.name;

    const areaArray = this.areaList.filter((v) => v.province_id == event.value);
    this.areaListFilter = areaArray.filter((obj, index, self) =>
      index === self.findIndex((t) => t.name === obj.name)
    );

    this.ndService.tableView(name!, this.start_date, this.end_date).subscribe((res) => {
      console.log("tableView", res.data)
    });
  }

  onAreaChange(event: any) {
    console.log("area", event.value);
    this.ndService.posByArea(this.provinceName, this.area.name, this.start_date, this.end_date).subscribe((res) => {
      this.tableArea = res.data;
      console.log("tableArea 3", this.tableArea)
    });

  }


  getPerformanceEQ() {
    this.chartOptions2 = {
      series: [
        {
          data: [90, 93, 95, 98],
          color: '#77D882',
        },
      ],
      chart: {
        type: 'bar',
        height: 150,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: ['Funa', 'Lukunga', 'Tshiangu', 'Mont-amba'],
      },
    };
  }


  getByAverage() {

    console.log("averages", this.averages)
    this.chartOptions3 = {
      series: [
        {
          name: 'Brand',
          colors: ['#FFC38F'],
          data: this.averages,
          // data: [ 
          //   {
          //     x: 'Eq',
          //     y: 100,
          //   },
          //   {
          //     x: 'Dhl',
          //     y: 60,
          //   },
          //   {
          //     x: 'Ar',
          //     y: 70,
          //   },
          //   {
          //     x: 'Sbl',
          //     y: 50,
          //   },
          //   {
          //     x: 'Pmf',
          //     y: 70,
          //   },
          //   {
          //     x: 'Pmm',
          //     y: 80,
          //   },
          //   {
          //     x: 'Ticket',
          //     y: 10,
          //   },
          //   {
          //     x: 'Mtc',
          //     y: 40,
          //   },
          //   {
          //     x: 'Ws',
          //     y: 70,
          //   }, {
          //     x: 'Mast',
          //     y: 100,
          //   }, {
          //     x: 'Oris',
          //     y: 50,
          //   }, {
          //     x: 'Elite',
          //     y: 30,
          //   }, {
          //     x: 'Yes',
          //     y: 20,
          //   }, {
          //     x: 'Time',
          //     y: 80,
          //   },
          // ],
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

  getChartByYear() {
    this.chartOptions4 = {
      series: [
        {
          name: 'Equateur',
          data: [10, 60, 30, 80, 70, 40, 60, 20, 100, 0, 0, 0],
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
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };
  }

}
