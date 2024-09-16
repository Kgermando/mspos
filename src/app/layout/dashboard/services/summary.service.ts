import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SummaryService extends ApiService {
  endpoint: string = `${environment.apiUrl}/dashboard/sammury`;
 

  DrCount(): Observable<any> {
    return this.http.get(`${this.endpoint}/dr-count`);
  } 

  POSCount(): Observable<any> {
    return this.http.get(`${this.endpoint}/pos-count`);
  }

  ProvinceCount(): Observable<any> {
    return this.http.get(`${this.endpoint}/province-count`);
  }

  AreaCount(): Observable<any> {
    return this.http.get(`${this.endpoint}/area-count`);
  }



  
 
}