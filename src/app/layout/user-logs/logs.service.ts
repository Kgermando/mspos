import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { UserLogsSubmit } from './models/user-logs.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService extends ApiService {
  endpoint: string = `${environment.apiUrl}/users-logs`;


  activity(
    name: string, 
    user_id: number, 
    action: string, 
    description: string, 
    signature: string): Observable<any> {
    var data: UserLogsSubmit = {
      name: name,
      user_id: user_id,
      action: action,
      description: description,
      signature: signature,
    };
    return this.http.post(`${this.endpoint}/create`, data);
  }
}
