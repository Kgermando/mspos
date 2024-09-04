import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data, {
      withCredentials: true
    });
  }

  register(data: any): Observable<any> {
    return this.http.post<UserModel>(`${environment.apiUrl}/auth/register`, data);
  }


  user(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiUrl}/auth/user`);
  }


  logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/logout`, {});
  }


  updateInfo(data: any): Observable<UserModel> {
    return this.http.put<UserModel>(`${environment.apiUrl}/users/info`, data);
  }

  updatePassword(data: any): Observable<UserModel> {
    return this.http.put<UserModel>(`${environment.apiUrl}/users/password`, data);
  }

}