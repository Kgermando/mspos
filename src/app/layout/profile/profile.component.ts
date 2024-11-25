import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UserLogsModel } from '../user-logs/models/user-logs.model';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PosformService } from '../posform/posform.service';
import { IPosForm } from '../posform/models/posform.models';

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

  isLoadingData = false;

  currentUser!: UserModel;

  public searchLog = '';
  public searchPosForm = '';

  // Table 
  dataLogList: UserLogsModel[] = [];
  totalItemsLog: number = 0;
  pageSizeLog: number = 15;
  pageIndexLog: number = 0;
  lengthLog: number = 0;
  displayedColumnsLog: string[] = ['created', 'title', 'name', 'action', 'description'];
  dataSourceLog = new MatTableDataSource<UserLogsModel>(this.dataLogList);


  // Table 2
  dataPosFormList: IPosForm[] = [];
  totalItemsPosForm: number = 0;
  pageSizePosForm: number = 15;
  pageIndexPosForm: number = 0;
  lengthPosForm: number = 0; 
  displayedColumnsPosForm: string[] = ['eq', 'sold', 'dhl', 'ar', 'sbl', 'pmf', 'pmm', 'ticket', 'mtc', 'ws', 'mast', 'oris', 'elite', 'yes', 'time', 'province_id', 'area_id', 'sup_id', 'pos_id', 'comment'];
  dataSourcePosForm = new MatTableDataSource<IPosForm>(this.dataPosFormList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  province!: IProvince;

  formGroup!: FormGroup;

  formGroupChangePassword!: FormGroup;

  public password: boolean[] = [false];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private provinceService: ProvinceService,
    private logsService: LogsService,
    public posformService: PosformService,
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

        this.logsService.refreshDataList$.subscribe(() => {
          this.fetchProductsLog(this.currentUser.id);
        });
        this.fetchProductsLog(this.currentUser.id);

        this.posformService.refreshDataList$.subscribe(() => {
          this.fetchProductsPosForm(this.currentUser.id);
        });
        this.fetchProductsPosForm(this.currentUser.id);

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }


  onPageChangeLog(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndexLog = event.pageIndex
    this.pageSizeLog = event.pageSize
    this.fetchProductsLog(this.currentUser.id);
  }

  fetchProductsLog(id: number) {
    this.logsService.getPaginatedById(id, this.pageIndexLog, this.pageSizeLog, this.searchLog).subscribe(res => {
      this.dataLogList = res.data;
      this.totalItemsLog = res.pagination.total_pages;
      this.lengthLog = res.pagination.length;
      this.dataSourceLog = new MatTableDataSource<UserLogsModel>(this.dataLogList); 
      this.dataSourceLog.sort = this.sort;

      this.isLoadingData = false;
    });
  }

  onSearchChangeLog(search: string) {
    this.searchLog = search;
    this.fetchProductsLog(this.currentUser.id);
  }

  public sortDataLog(sort: Sort) {
    const data = this.dataLogList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataLogList = data;
    } else {
      this.dataLogList = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  applyFilterLog(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLog.filter = filterValue.trim().toLowerCase();
  }




  onPageChangePosForm(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndexPosForm = event.pageIndex
    this.pageSizePosForm = event.pageSize
    this.fetchProductsPosForm(this.currentUser.id);
  }

  fetchProductsPosForm(id: number) {
    this.posformService.getPaginatedById(id, this.pageIndexPosForm, this.pageSizePosForm, this.searchPosForm).subscribe(res => {
      this.dataPosFormList = res.data;
      this.totalItemsPosForm = res.pagination.total_pages;
      this.lengthPosForm = res.pagination.length;
      this.dataSourcePosForm = new MatTableDataSource<IPosForm>(this.dataPosFormList);
      this.dataSourcePosForm.sort = this.sort;

      this.isLoadingData = false;
    });
  }

  onSearchChangePosForm(search: string) {
    this.searchPosForm = search;
    this.fetchProductsPosForm(this.currentUser.id);
  }


  public sortDataPosForm(sort: Sort) {
    const data = this.dataPosFormList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataPosFormList = data;
    } else {
      this.dataPosFormList = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  applyFilterPosForm(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePosForm.filter = filterValue.trim().toLowerCase();
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
          this.logsService.activity(
            'User profil',
            this.currentUser.id,
            'updated',
            `Update user profil ${this.currentUser.id}`,
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
            this.logsService.activity(
              'User profil',
              this.currentUser.id,
              'updated',
              `Change password user profil ${this.currentUser.id}`,
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
