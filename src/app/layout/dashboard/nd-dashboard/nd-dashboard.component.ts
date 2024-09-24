import { Component, OnInit, Renderer2} from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { ProvinceService } from '../../province/province.service';
import { AreaService } from '../../areas/area.service';
import { CommonService } from '../../../shared/common/common.service';
import { IProvince, IProvinceDropdown } from '../../province/models/province.model';
import { IArea, IAreaDropdown } from '../../areas/models/area.model';
import { NdService } from '../services/nd.service';
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NDYearModel, TableViewModel } from '../models/nd-dashboard.models';


@Component({
  selector: 'app-nd-dashboard',
  templateUrl: './nd-dashboard.component.html',
  styleUrl: './nd-dashboard.component.scss'
})
export class NdDashboardComponent implements OnInit {
  public routes = routes;
  base = '';
  page = '';
  last = '';

  isLoading = false;

  dateRange!: FormGroup;
  start_date!: string;
  end_date!: string;

  // Filtre 
  rangeDate: any[] = [];
  provinceDropdownList: IProvinceDropdown[] = [];
  provinceDropdown!: IProvinceDropdown;
  areaList: IAreaDropdown[] = [];
  areaListFilter: IAreaDropdown[] = [];
  area!: IAreaDropdown;
  areaCount = 1; // For found length area for divide by ND


  tableViewData: TableViewModel[] = [];   
  tableViewList: TableViewModel[] = [];   
  averageAreaData: TableViewModel[] = [];
  averageAreaList: TableViewModel[] = [];
  performanceAreaData: TableViewModel[] = []; 
  performanceAreaList: TableViewModel[] = []; 
  ndYearList: NDYearModel[] = [];


  constructor(
    private common: CommonService,
    private _formBuilder: FormBuilder,
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
    this.isLoading = true;
    this.provinceService.getProvinceDropdown().subscribe((res) => {
      this.provinceDropdownList = res.data; 
      this.areaService.getAreaDropdown().subscribe((r) => {
        this.areaList = r.data; 
        if (!this.provinceDropdown) {
          const dataList = this.provinceDropdownList.filter((v) => v.name == 'Kinshasa');
          console.log("dataList[0].id", dataList[0].id)   
          const areaArray = this.areaList.filter((v) => v.province_id == dataList[0].id);
          this.areaListFilter = areaArray.filter((obj, index, self) =>
            index === self.findIndex((t) => t.name === obj.name) 
          );
          this.areaCount = this.areaListFilter.length; // Total Area par province selectionner 
        }
      }); 
    });
  

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.rangeDate = [firstDay, lastDay];

    this.dateRange = this._formBuilder.group({
      province: new FormControl('Kinshasa'),
      rangeValue: new FormControl(this.rangeDate),
      area: new FormControl('Funa'), 
    });
    this.start_date = formatDate(this.dateRange.value.rangeValue[0], 'yyyy-MM-dd', 'en-US');
    this.end_date = formatDate(this.dateRange.value.rangeValue[1], 'yyyy-MM-dd', 'en-US');


    if (!this.provinceDropdown && this.start_date && this.end_date) {
      this.getTableView(this.dateRange.value.province,this.start_date, this.end_date);
      this.getAverageArea(this.dateRange.value.province, this.dateRange.value.area, this.start_date, this.end_date);
      this.getPerformance(this.dateRange.value.province, this.start_date, this.end_date);
      this.getNDYear(this.dateRange.value.province);
    }

    this.onChanges();
  }

  onChanges(): void {
    this.dateRange.valueChanges.subscribe(val => {
      this.provinceDropdown = val.province;
      this.start_date = formatDate(val.rangeValue[0], 'yyyy-MM-dd', 'en-US');
      this.end_date = formatDate(val.rangeValue[1], 'yyyy-MM-dd', 'en-US');   
      this.area = val.area;
 

      const areaArray = this.areaList.filter((v) => v.province_id == this.provinceDropdown.id);
      this.areaListFilter = areaArray.filter((obj, index, self) =>
        index === self.findIndex((t) => t.name === obj.name)
      );
      this.areaCount = this.areaListFilter.length;

      this.getTableView(this.provinceDropdown.name, this.start_date, this.end_date);
      this.getAverageArea(this.provinceDropdown.name, this.area.name, this.start_date, this.end_date);
      this.getPerformance(this.provinceDropdown.name, this.start_date, this.end_date);
      this.getNDYear(this.provinceDropdown.name);
    });
  }
 

  getAverageArea(province: string, area: string, start_date: string, end_date: string) {  
    this.ndService.tableView(province, start_date, end_date).subscribe((res) => {
      this.averageAreaData = res.data;   
      this.averageAreaList = this.averageAreaData.filter((val) => val.Area == area);
      this.isLoading = false;
    });
  }


  getNDYear(province: string) {
    this.ndService.NdByYear(province).subscribe((res) => {
      this.ndYearList = res.data; 
      console.log("res", res.data)
      this.isLoading = false;
    });
  }


  getPerformance(province: string, start_date: string, end_date: string) {
    this.ndService.tableView(province, start_date, end_date).subscribe((res) => {
      this.performanceAreaList = res.data; 
      console.log("province", province); 
      this.isLoading = false;
    });
  }


  getTableView(province: string, start_date: string, end_date: string) {
    this.ndService.tableView(province, start_date, end_date).subscribe((res) => {
      this.tableViewList = res.data; 
      this.isLoading = false;
    });
  }

 

}
