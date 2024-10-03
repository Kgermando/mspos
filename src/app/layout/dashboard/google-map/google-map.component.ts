import { Component, OnInit, Renderer2 } from '@angular/core';
import { GoogleMapsService } from '../../../shared/services/google-maps.service';
import { routes } from '../../../shared/routes/routes';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '../../../shared/common/common.service';
import { PosformService } from '../../posform/posform.service';
import { formatDate } from '@angular/common';
import { SummaryService } from '../services/summary.service';
import { GoogleMapModel } from '../models/summary-dashboard.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
export class GoogleMapComponent implements OnInit {
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

  googleMapList: GoogleMapModel[] = [];

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
    if (this.last == 'google-maps') {
      this.renderer.addClass(document.body, 'date-picker-dashboard');
    }
  }

  ngOnInit() {
    this.isLoading = true;
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
      this.getPosFormList(this.start_date, this.end_date); 
    }

    this.onChanges();
  }


  onChanges(): void {
    this.dateRange.valueChanges.subscribe(val => { 
      this.start_date = formatDate(val.rangeValue[0], 'yyyy-MM-dd', 'en-US');
      this.end_date = formatDate(val.rangeValue[1], 'yyyy-MM-dd', 'en-US');   

      this.getPosFormList(this.start_date, this.end_date); 
    });
  }
 

  getPosFormList(start_date: string, end_date: string) {  
    this.summaryService.GoogleMap(start_date, end_date).subscribe((res) => {
      const dataList = res.data; 
      if (dataList) {
        this.googleMapList = dataList;
      }
      // console.log("googleMapList", this.googleMapList)
      this.isLoading = false;
    }); 
  }


}
