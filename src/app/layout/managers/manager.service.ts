import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends ApiService {
  endpoint: string = `${environment.apiUrl}/managers`; 
}