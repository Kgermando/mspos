import { Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { routes } from '../../../shared/routes/routes';
import { ProvinceService } from '../../province/province.service';
import { AreaService } from '../../areas/area.service';
import { CommonService } from '../../../shared/common/common.service';
import { IProvince } from '../../province/models/province.model';
import { IArea } from '../../areas/models/area.model';

export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
}

@Component({
  selector: 'app-nd-dashboard',
  templateUrl: './nd-dashboard.component.html',
  styleUrl: './nd-dashboard.component.scss'
})
export class NdDashboardComponent implements OnInit, OnChanges {
  public routes = routes;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();
  base = '';
  page = '';
  last = '';

  provinceList: IProvince[] = [];
  province!: IProvince;
  areaList: IArea[] = [];
  areaListFilter: IArea[] = [];



  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;

  constructor(
    private common: CommonService,
    private renderer: Renderer2,
    private provinceService: ProvinceService,
    private areaService: AreaService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    if (this.page == 'deals-dashboard') {
      this.renderer.addClass(document.body, 'date-picker-dashboard');
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
   

  }


  ngOnInit(): void {
    this.provinceService.getAll().subscribe(res => {
      this.provinceList = res.data;
    });
    this.areaService.getAll().subscribe(res => {
      this.areaList = res.data;
    });

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
          data: [
            {
              x: 'Inpipeline',
              y: 400,
            },
            {
              x: 'Follow Up',
              y: 130,
            },
            {
              x: 'Schedule',
              y: 248,
            },
            {
              x: 'Conversation',
              y: 470,
            },
            {
              x: 'Won',
              y: 470,
            },
            {
              x: 'Lost',
              y: 180,
            },
          ],
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
    console.log("name", name);

    const areaArray = this.areaList.filter((v) => v.province_id == event.value);
    this.areaListFilter = areaArray.filter((obj, index, self) =>
      index === self.findIndex((t) => t.name === obj.name)
    );
    console.log("areaArray", areaArray);
    console.log("areaListFilter", this.areaListFilter);
  }

  onAreaChange(event: any) {
    console.log("province", event.value);
  }


}
