/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { routes } from '../../../shared/routes/routes';
import { CommonService } from '../../../shared/common/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProvince } from '../../province/models/province.model';
import { SummaryService } from '../services/summary.service';
export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
}

@Component({
  selector: 'app-mspos-dashboard',
  templateUrl: './mspos-dashboard.component.html',
  styleUrl: './mspos-dashboard.component.scss'
})
export class MsposDashboardComponent implements OnInit {
  public routes =  routes 
  base = '';
  page = '';
  last = ''; 

  isLoading = false;

  dateRange!: FormGroup;
  start_date!: string;
  end_date!: string;

  // Filtre 
  rangeDate: any[] = []; 


  drCount = 0;
  posCount = 0;
  provinceCount = 0;
  areaCount = 0;

   
  constructor(
    private common: CommonService,
    private _formBuilder: FormBuilder,
    private renderer: Renderer2,
    private summaryService: SummaryService, 
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
    this.getDrCount();
    this.getPOSCount();
    this.getProvinceCount();
    this.getAreaCount();
  }



  getDrCount() {
    this.summaryService.DrCount().subscribe((res) => {
      this.drCount = res.data.Count;
      this.isLoading = false;
    });
  }

  getPOSCount() {
    this.summaryService.POSCount().subscribe((res) => {
      this.posCount = res.data.Count;
      this.isLoading = false;
    });
  }

  getProvinceCount() {
    this.summaryService.ProvinceCount().subscribe((res) => {
      this.provinceCount = res.data.Count;
      this.isLoading = false;
    });
  }

  getAreaCount() {
    this.summaryService.AreaCount().subscribe((res) => {
      this.areaCount = res.data.Count;
      this.isLoading = false;
    });
  }


  
}

