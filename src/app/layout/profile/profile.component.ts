import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { UserModel } from '../../auth/models/user.model';
import { AuthService } from '../../auth/auth.service';
import { routes } from '../../shared/routes/routes';
import { IProvince } from '../province/models/province.model';
import { ProvinceService } from '../province/province.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isLoading = false;  
  public routes = routes;

  currentUser!: UserModel;

  province!: IProvince;

  constructor(  
    private router: Router,
    private authService: AuthService, 
    private provinceService: ProvinceService
   ) {}

   ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.provinceService.get(this.currentUser.province_id).subscribe((res) => {
          this.province = res.data;
          this.isLoading = false;
        });
        
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  } 
}
