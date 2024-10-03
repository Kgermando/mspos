import { Component, OnInit } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  dateY = "";
  public routes = routes;
  isLoading = false;

  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.dateY = formatDate(new Date(), 'yyyy', 'en');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void  {
    if (this.form.valid) {
      this.isLoading = true;
      var body = {
        email: this.form.value.email.toLowerCase(),
        password: this.form.value.password
      };

      this.authService.login(body).subscribe({
        next: (res) => {
          this.authService.user().subscribe({
            next: (user) => {
              // console.log("user", user)
              this.toastr.success(`Bienvenue ${user.fullname}! 🎉`, 'Success!');
              // this.navigate();
              // let user: UserModel = u; 
             
              let permission = JSON.stringify(user.permission);
              localStorage.removeItem('permissions');
              localStorage.setItem('permission', permission);

              if (user.role == 'Manager') {
                this.router.navigate([routes.msposDashboard]);
              } else if (user.role == 'ASM') {
                this.router.navigate([routes.msposDashboard]);
              }  else if (user.role == 'Supervisor') {
                this.router.navigate([routes.msposDashboard]);
              }  else if (user.role == 'DR') {
                this.router.navigate([routes.posFormList]);
              }  else if (user.role == 'Support') {
                this.router.navigate([routes.userLogsList]);
              } else {
                this.router.navigate(['/auth/login']);
              }

              // if (user.status) {
              //   if (user.permission === 'Dashboard') { 
              //     this.router.navigate(['/web/dashboard']);
              //   } else if (user.permissions[0] === 'Actualites') {
              //     this.router.navigate(['/web/actualites/list']);
              //   } else if (user.permissions[0] === 'Contact') {
              //     this.router.navigate(['/web/contacts/list']);
              //   } else if (user.permissions[0] === 'Personnalites') {
              //     this.router.navigate(['/web/personnalites/list']);
              //   } else if (user.permissions[0] === 'PropositionsLois') {
              //     this.router.navigate(['/web/proposition-lois/list']);
              //   } else if (user.permissions[0] === 'Sondages') {
              //     this.router.navigate(['/web/sondages/list']);
              //   } else if (user.permissions[0] === 'Teams') {
              //     this.router.navigate(['/web/teams/list']);
              //   } else if (user.permissions[0] === 'Textes') {
              //     this.router.navigate(['/web/textes/list']);
              //   } else if (user.permissions[0] === 'Users') { 
              //     this.router.navigate(['/web/users/list']);
              //   } else {
              //     console.log("else")
              //     this.router.navigate(['/auth/login']);
              //   }
              //   // this.toastr.success(`Bienvenue ${user.fullname}!`, 'Success!');
              // } else {
              //   this.router.navigate(['/auth/login']);
              // }
              
              this.isLoading = false;
            },
            error: (error) => {
              this.isLoading = false;
              this.router.navigate(['/auth/login']);
              console.log(error);
            }
          });
        },
        error: (e) => {
          this.isLoading = false;
          console.error(e); 
          this.toastr.error(`${e.error.message}`, 'Oupss!');
          this.router.navigate(['/auth/login']);
        },
      }
      )
    }
  }

  private navigate() {
    this.router.navigate([routes.msposDashboard]);
  }
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }
}
