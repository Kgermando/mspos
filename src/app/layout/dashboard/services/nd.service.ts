import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NdService extends ApiService {
  endpoint: string = `${environment.apiUrl}/dashboard/numeric-distribution`;


  tableView(province: string, start_date: string, end_date: string): Observable<any> {
    return this.http.get(`${this.endpoint}/table-view/${province}/${start_date}/${end_date}`);
  }

  posByArea(province: string, area: string, start_date: string, end_date: string): Observable<any> {
    return this.http.get(`${this.endpoint}/pos-area/${province}/${area}/${start_date}/${end_date}`);
  }

  // http://localhost:8000/api/dashboard/numeric-distribution/pos-area/kinshasa/Funa/2024-09-01/2024-09-17

}
