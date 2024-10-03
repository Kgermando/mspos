import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../auth/models/user.model';
import { AuthService } from '../../auth/auth.service';
import { routes } from '../../shared/routes/routes';
import { IProvince } from '../province/models/province.model';
import { ProvinceService } from '../province/province.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from 'ngx-editor';
import { LogsService } from '../user-logs/logs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public routes = routes;

  isLoading = false; 
  isLoadingEdit = false;
  isLoadingChangePassword = false;



  currentUser!: UserModel;

  province!: IProvince;

  formGroup!: FormGroup;

  formGroupChangePassword!: FormGroup;

  public password: boolean[] = [false];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private provinceService: ProvinceService,
    private logActivity: LogsService,
    private toastr: ToastrService
  ) { }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index]
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      fullname: [''],
      email: ['', Validators.required],
      phone: [''],
      // image: [''], 
    });

    this.formGroupChangePassword = this._formBuilder.group({
      old_password: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
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
        this.formGroup.patchValue({
          fullname: this.currentUser.fullname,
          email: this.currentUser.email,
          phone: this.currentUser.phone, 
        });

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }


  onSubmitUpdate() {
    try {
      this.isLoadingEdit = true;
      var body = {
        fullname: this.formGroup.value.fullname,
        email: this.formGroup.value.email,
        phone: this.formGroup.value.phone,
        signature: this.currentUser.fullname,
      };
      this.authService.updateInfo(body).subscribe({
        next: () => {
          this.logActivity.activity(
            'User profil',
            this.currentUser.id,
            'update',
            'Update user profil',
            this.currentUser.fullname
          ).subscribe({
            next: () => {
              this.formGroup.reset();
              this.toastr.success('Modification enregistré!', 'Success!');
              this.isLoadingEdit = false;
            },
            error: (err) => {
              this.isLoadingEdit = false;
              this.toastr.error(`${err.error.message}`, 'Oupss!');
              console.log(err);
            }
          });  
        },
        error: err => {
          console.log(err);
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          this.isLoadingEdit = false;
        }
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  onSubmitChangePassword() {
    try {
      this.isLoadingChangePassword = true;
      var body = {
        old_password: this.formGroupChangePassword.value.old_password,
        password: this.formGroupChangePassword.value.password,
        password_confirm: this.formGroupChangePassword.value.password_confirm, 
      };
      this.authService.updatePassword(body).subscribe({
        next: () => {
          this.authService.logout().subscribe(res => {
            this.logActivity.activity(
              'User profil',
              this.currentUser.id,
              'update',
              'Change password user profil',
              this.currentUser.fullname
            ).subscribe({
              next: () => {
                this.formGroupChangePassword.reset();
                this.toastr.success('Mot de passe modifié!', 'Success!');
                this.isLoadingChangePassword = false;
                this.router.navigate(['/auth/login']);
              },
              error: (err) => {
                this.isLoadingChangePassword = false;
                this.toastr.error(`${err.error.message}`, 'Oupss!');
                console.log(err);
              }
            }); 
          }); 
        },
        error: err => {
          console.log(err);
          this.toastr.error(`${err.error.message}`, 'Oupss!');
          this.isLoadingChangePassword = false;
        }
      });
    } catch (error) {
      this.isLoadingChangePassword = false;
      console.log(error);
    }
  }
}
