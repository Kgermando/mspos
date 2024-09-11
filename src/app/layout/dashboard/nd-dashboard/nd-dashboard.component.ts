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
import { NDDashboardByArea, NDDashboardTableView } from '../models/nd-dashboard.models';


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
export class NdDashboardComponent implements OnInit, OnChanges {
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

  tableView: NDDashboardTableView[] = [];

  tableArea: NDDashboardByArea[] = [];
  area!: IArea;


  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;

  public chartOptionPie!: Partial<ChartOptionPie>;

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


  ngOnChanges(changes: SimpleChanges): void {
    this.endDate.setDate(this.endDate.getDate() + 7);
    this.rangeValue = [this.startDate, this.endDate];
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
      console.log("tableView", this.tableView)
    });

    // this.ndService.posByArea(this.provinceName, this.area.name, this.start_date, this.end_date).subscribe((res) => {
    //   this.tableArea = res.data;
    //   console.log("tableArea", this.tableArea)
    // });
  }


  ngOnInit(): void {
    this.startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

    this.provinceService.getAll().subscribe(res => {
      this.provinceList = res.data;
    });
    this.areaService.getAll().subscribe(res => {
      this.areaList = res.data;
    });

    this.endDate.setDate(this.endDate.getDate() + 7);
    this.rangeValue = [this.startDate, this.endDate];
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
    });

    if (!this.area) {
      this.ndService.posByArea(this.provinceName, 'Funa', this.start_date, this.end_date).subscribe((res) => {
        this.tableArea = res.data;
        console.log("tableArea 2", this.tableArea)
      });
    }
    


    this.chartOptions1 = {
      series: [44, 55, 41, 17],
      chart: {
        type: 'donut',

      },
      colors: ['#0092E4', '#4A00E5', '#E41F07', '#FFA201'],
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },




    };
    this.chartOptions = {
      series: [
        {
          data: [400, 220, 448],
          color: '#FC0027',
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
        categories: ['Conversation', 'Follow Up', 'Inpipeline'],
      },
    };
    this.chartOptions3 = {
      series: [
        {
          name: 'sales',
          colors: ['#FFC38F'],
          data: this.tableArea,
          // data: [
          //   {
          //     x: 'Inpipeline',
          //     y: 400,
          //   },
          //   {
          //     x: 'Follow Up',
          //     y: 130,
          //   },
          //   {
          //     x: 'Schedule',
          //     y: 248,
          //   },
          //   {
          //     x: 'Conversation',
          //     y: 470,
          //   },
          //   {
          //     x: 'Won',
          //     y: 470,
          //   },
          //   {
          //     x: 'Lost',
          //     y: 180,
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
        max: 500,
        tickAmount: 5,
      }
    };
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


  getPieSecteurs() {
    this.chartOptionPie = {
        series: this.tableArea.map((item: any) => parseFloat(item)),
        // colors: ["#ee368c", "#757fef"],
        chart: {
            height: 250,
            type: "donut"
        },
        tooltip: {
            y: {
                formatter: function (val) { 
                    var beneficiaire = "";
                    if(val > 1) {
                        beneficiaire = "Beneficiaires";
                    } else {
                        beneficiaire = "Beneficiaire";
                    }
                    return "" + val + " " + beneficiaire;
                },
            },
        },
        stroke: {
            width: 1,
            show: true
        },
        legend: {
            offsetY: 0,
            show: false,
            fontSize: "14px",
            position: "bottom",
            horizontalAlign: "center"
        },
        labels: this.tableArea.map((item: any) => item)
    };
}

}
