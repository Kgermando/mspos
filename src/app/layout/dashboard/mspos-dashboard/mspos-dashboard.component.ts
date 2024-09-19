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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProvince } from '../../province/models/province.model';
import { SummaryService } from '../services/summary.service';
import { BetterModel, PerfVisitModel, SOSPieModel, StatusEquipementModel, SumChartBarModel } from '../models/summary-dashboard.model';
import { formatDate } from '@angular/common';
import { getBusinessDaysBetweenDates } from '../../../utils/calcul-date-except-weekend';
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

  sosPieLIst: SOSPieModel[] = [];

  perfVisitDRList: PerfVisitModel[] = [];

  summaryChartList: SumChartBarModel[] = [];

  betterDRList: BetterModel[] = [];

  betterSupList: BetterModel[] = [];

  statusEquipementList: StatusEquipementModel[] = [];

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
    if (this.last == 'mspos-dashboard') {
      this.renderer.addClass(document.body, 'date-picker-dashboard');
    }
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.getDrCount();
    this.getPOSCount();
    this.getProvinceCount();
    this.getAreaCount();

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.rangeDate = [firstDay, lastDay];

    this.dateRange = this._formBuilder.group({ 
      rangeValue: new FormControl(this.rangeDate),
    });
    this.start_date = formatDate(this.dateRange.value.rangeValue[0], 'yyyy-MM-dd', 'en-US');
    this.end_date = formatDate(this.dateRange.value.rangeValue[1], 'yyyy-MM-dd', 'en-US');


    if (this.start_date && this.end_date) {  
      this.getSOSPie(this.start_date, this.end_date);
      this.getTrackingVisit('20', this.start_date, this.end_date);
      this.getSummryChart(this.start_date, this.end_date);
      this.getBetterDR(this.start_date, this.end_date);
      this.getBestSup(this.start_date, this.end_date);
      this.getStatusEquiment(this.start_date, this.end_date);
    }

    this.onChanges();
  }

  onChanges(): void {
    this.dateRange.valueChanges.subscribe(val => { 
      const days = getBusinessDaysBetweenDates(val.rangeValue[0], val.rangeValue[1])
      this.start_date = formatDate(val.rangeValue[0], 'yyyy-MM-dd', 'en-US');
      this.end_date = formatDate(val.rangeValue[1], 'yyyy-MM-dd', 'en-US');  

      this.getSOSPie(this.start_date, this.end_date);
      this.getTrackingVisit(days.toString(), this.start_date, this.end_date);
      this.getSummryChart(this.start_date, this.end_date);
      this.getBetterDR(this.start_date, this.end_date);
      this.getBestSup(this.start_date, this.end_date);
      this.getStatusEquiment(this.start_date, this.end_date);
    });
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


  getSOSPie(start_date: string, end_date: string) {
    this.summaryService.SOSPie(start_date, end_date).subscribe((res) => {
      this.sosPieLIst = res.data;
      this.isLoading = false;
    });
  }

  getTrackingVisit(days: string, start_date: string, end_date: string) {
    this.summaryService.TrackingVisitDR(days, start_date, end_date).subscribe((res) => {
      this.perfVisitDRList = res.data;  
      this.isLoading = false;
    });
  }

  getSummryChart(start_date: string, end_date: string) {
    this.summaryService.SummaryChartBar(start_date, end_date).subscribe((res) => {
      this.summaryChartList = res.data;  
      this.isLoading = false;
    });
  }

  getBetterDR(start_date: string, end_date: string) {
    this.summaryService.BetterDR(start_date, end_date).subscribe((res) => {
      this.betterDRList = res.data;
      this.isLoading = false;
    });
  }

  getBestSup(start_date: string, end_date: string) {
    this.summaryService.SOSPie(start_date, end_date).subscribe((res) => {
      this.betterSupList = res.data;
      this.isLoading = false;
    });
  }

  getStatusEquiment(start_date: string, end_date: string) {
    this.summaryService.StatusEquipement(start_date, end_date).subscribe((res) => {
      this.statusEquipementList = res.data;
      this.isLoading = false;
    });
  }
}

