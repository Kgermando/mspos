import { Component, OnInit, Renderer2} from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { ProvinceService } from '../../province/province.service';
import { AreaService } from '../../areas/area.service';
import { CommonService } from '../../../shared/common/common.service';
import { IProvinceDropdown } from '../../province/models/province.model';
import { IAreaDropdown } from '../../areas/models/area.model'; 
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NDYearModel, TableViewModel } from '../models/nd-dashboard.models';
import { SosService } from '../services/sos.service';
import { SOSPieChartModel } from '../models/sos-dashboard.models';
import { AuthService } from '../../../auth/auth.service';
import { UserModel } from '../../../auth/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sos-dashboard',
  templateUrl: './sos-dashboard.component.html',
  styleUrl: './sos-dashboard.component.scss'
})
export class SosDashboardComponent implements OnInit {

  public routes = routes;
  base = '';
  page = '';
  last = '';

  isLoading = false;
  currentUser!: UserModel;

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
  areaCount = 1;


  sosPieLIst: SOSPieChartModel[] = [];
  tableViewList: TableViewModel[] = [];
  sosYearList: NDYearModel[] = []; 

  constructor(
    private common: CommonService,
    private _formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService,
    private sosService: SosService,
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
    if (this.last == 'share-of-stock') {
      this.renderer.addClass(document.body, 'date-picker-dashboard');
    }
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        if (this.currentUser.role == 'Manager') { 
          
        } else if (this.currentUser.role == 'ASM') {
          
        } else if (this.currentUser.role == 'Supervisor') {
          
        } else if (this.currentUser.role == 'DR') {
           
        } else if (this.currentUser.role == 'Support') {
           
        } else {
           
        }

      },
      error: (error) => { 
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

    this.provinceService.getProvinceDropdown().subscribe((res) => {
      this.provinceDropdownList = res.data; 
      this.areaService.getAreaDropdown().subscribe((r) => {
        this.areaList = r.data; 
        if (!this.provinceDropdown) {
          const dataList = this.provinceDropdownList.filter((v) => v.name == 'Kinshasa');  
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
      this.getPieChart(this.dateRange.value.province, this.start_date, this.end_date);
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
      this.getPieChart(this.provinceDropdown.name, this.start_date, this.end_date);
      this.getNDYear(this.provinceDropdown.name);
    });
  }


  getPieChart(province: string, start_date: string, end_date: string) {
    this.sosService.SOSPieChart(province, start_date, end_date).subscribe((res) => {
      const dataList = res.data; 
      if (dataList) {
        this.sosPieLIst = dataList;
      } 
      this.isLoading = false;
    });
  }

  getTableView(province: string, start_date: string, end_date: string) {
    this.sosService.SOSTableView(province, start_date, end_date).subscribe((res) => {
      const dataList = res.data; 
      if (dataList) {
        this.tableViewList = dataList;
      }  
      this.isLoading = false;
    });
  }

  getNDYear(province: string) {
    this.sosService.SOSByYear(province).subscribe((res) => {
      const dataList = res.data; 
      if (dataList) {
        this.sosYearList = dataList;
      }
      this.isLoading = false;
    });
  }
}
