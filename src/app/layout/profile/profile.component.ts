import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { UserModel } from '../../auth/models/user.model';
import { AuthService } from '../../auth/auth.service';
import { routes } from '../../shared/routes/routes';
import { IProvince } from '../province/models/province.model';
import { ProvinceService } from '../province/province.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isLoading = false;

  isLoadingEdit = false;  
  public routes = routes;

  currentUser!: UserModel;

  province!: IProvince;


  formGroup!: FormGroup;

  constructor(  
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService, 
    private provinceService: ProvinceService
   ) {}

   ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      name: [''], 
      province_id: [''],  
    });

    this.isLoading = true; 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        if (this.currentUser.province_id) {
          this.provinceService.get(this.currentUser.province_id).subscribe((res) => {
            this.province = res.data;
            this.isLoading = false;
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  } 


  onSubmitUpdate() {}
}
