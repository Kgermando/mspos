import { Component } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  dateY = "";
  public routes = routes;
  constructor(private router: Router) {
    this.dateY = formatDate(new Date(), 'yyyy', 'en'); 
  }

  public navigate() {
    this.router.navigate([routes.dashboard]);
  }
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }
}
