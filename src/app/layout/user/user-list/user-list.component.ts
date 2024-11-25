import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { UserService } from '../user.service';
import { IUser } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../auth/models/user.model';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IProvince } from '../../province/models/province.model';
import { IPos } from '../../pos-vente/models/pos.model';
import { ISup } from '../../sups/models/sup.model';
import { IArea } from '../../areas/models/area.model';
import { ProvinceService } from '../../province/province.service';
import { AreaService } from '../../areas/area.service';
import { SupService } from '../../sups/sup.service';
import { IPermission, permissions } from '../../../shared/model/permission.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LogsService } from '../../user-logs/logs.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit, AfterViewInit {
  isLoadingData = false;
  public routes = routes;
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;

  // Table 
  dataList: IUser[] = [];
  totalItems: number = 0;
  pageSize: number = 15;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  displayedColumns: string[] = ['fullname', 'title', 'email', 'phone', 'province', 'area', 'sup', 'status', 'id'];
  dataSource = new MatTableDataSource<IUser>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public search = '';

  // Forms  
  idItem!: number;
  dataItem!: IUser; // Single data 

  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

  public password: boolean[] = [false];
  isStatusList: boolean[] = [false, true];
  isTitleList: string[] = [
    'Manager',
    'ASM',
    'Supervisor',
    'DR',
    'Support'
  ];

  permissionList: IPermission[] = permissions;

  provinceList: IProvince[] = [];
  areaList: IArea[] = [];
  areaListFilter: IArea[] = [];
  supList: ISup[] = [];
  supListFilter: ISup[] = [];
  isManager = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UserService,
    private provinceService: ProvinceService,
    private areaService: AreaService,
    private supService: SupService,
    private _formBuilder: FormBuilder,
    private logActivity: LogsService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.usersService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.currentUser);
        });
        this.fetchProducts(this.currentUser);

        this.provinceService.getAll().subscribe(res => {
          this.provinceList = res.data;
        });
        this.areaService.getAll().subscribe(res => {
          this.areaList = res.data;
        });
        this.supService.getAll().subscribe(res => {
          this.supList = res.data;
        });
      },
      error: (error) => {
        this.isLoadingData = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.isLoadingData = true;
    this.formGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
      province_id: [''],
      area_id: [''],
      sup_id: [''],
      // role: ['', Validators.required], // Utilise deja Title
      permission: ['', Validators.required],
      // image: [''], 
      status: [''],
      is_manager: [''],
    });


  }


  onPageChange(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.fetchProducts(this.currentUser);
  }



  fetchProducts(currentUser: UserModel) {
    if (currentUser.role == 'Manager') {
      this.usersService.getPaginated(this.pageIndex, this.pageSize, this.search).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IUser>(this.dataList);
        //  this.dataSource.paginator = this.paginator; 
        // this.paginator.length = res.pagination.length;
        this.dataSource.sort = this.sort;

        this.isLoadingData = false;
      });
    } else if (currentUser.role == 'ASM') {
      this.usersService.getPaginatedByProvinceId(currentUser.province_id, this.pageIndex, this.pageSize, this.search).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IUser>(this.dataList);
        // this.paginator.length = res.pagination.length;
        this.dataSource.sort = this.sort;

        this.isLoadingData = false;
      });

    } else if (currentUser.role == 'Supervisor') {
      this.usersService.getPaginatedBySupId(currentUser.area_id, this.pageIndex, this.pageSize, this.search).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IUser>(this.dataList);
        this.dataSource.sort = this.sort;

        this.isLoadingData = false;
      });

    } else {
      this.usersService.getPaginated(this.pageIndex, this.pageSize, this.search).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        console.log("data", res.data)
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IUser>(this.dataList);
        this.dataSource.sort = this.sort;

        this.isLoadingData = false;
      });
    } 

  }

  onSearchChange(search: string) {
    this.search = search;
    this.fetchProducts(this.currentUser);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public sortData(sort: Sort) {
    const data = this.dataList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataList = data;
    } else {
      this.dataList = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  openSidebarPopup1() {
    this.sidebarPopup1 = !this.sidebarPopup1;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index]
  }


  onChangeCheck(event: any) {
    this.isManager = event.target.checked;
    console.log('isManager value:', this.isManager);
  }



  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = {
          fullname: this.formGroup.value.fullname,
          email: this.formGroup.value.email,
          title: this.formGroup.value.title,
          phone: this.formGroup.value.phone,
          password: this.formGroup.value.password,
          password_confirm: this.formGroup.value.password_confirm,
          province_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.province_id),
          area_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.area_id),
          sup_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.sup_id),
          // pos_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.pos_id),
          role: this.formGroup.value.title, // Role et title c'est la meme chose mais le role cest pour le code source
          permission: this.formGroup.value.permission,
          // image: this.imageUrl,  
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          is_manager: (this.formGroup.value.is_manager) ? this.formGroup.value.is_manager : false,
          signature: this.currentUser.fullname,
        };
        this.usersService.create(body).subscribe({
          next: (res) => {
            this.logActivity.activity(
              'Users',
              this.currentUser.id,
              'created',
              `Created new user id: ${res.data.ID}`,
              this.currentUser.fullname
            ).subscribe({
              next: () => {
                this.isLoading = false;
                this.formGroup.reset();
                this.toastr.success('Ajouter avec succès!', 'Success!');
              },
              error: (err) => {
                this.isLoading = false;
                this.toastr.error(`${err.error.message}`, 'Oupss!');
                console.log(err);
              }
            });
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error(`${err.error.message}`, 'Oupss!');
            console.log(err);
          }
        });
      }
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  onSubmitUpdate() {
    try {
      this.isLoading = true;
      var body = {
        fullname: this.formGroup.value.fullname,
        email: this.formGroup.value.email,
        title: this.formGroup.value.title,
        phone: this.formGroup.value.phone,
        province_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.province_id),
        area_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.area_id),
        sup_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.sup_id),
        // pos_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.pos_id),
        role: this.formGroup.value.title, // Role et title c'est la meme chose mais le role cest pour le code source
        permission: this.formGroup.value.permission,
        // image: this.imageUrl,  
        status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
        is_manager: (this.formGroup.value.is_manager) ? this.formGroup.value.is_manager : false,
        signature: this.currentUser.fullname,
      };
      this.usersService.update(this.idItem, body)
        .subscribe({
          next: (res) => {
            this.logActivity.activity(
              'Users',
              this.currentUser.id,
              'updated',
              `Updated user id: ${res.data.ID}`,
              this.currentUser.fullname
            ).subscribe({
              next: () => {
                this.formGroup.reset();
                this.toastr.success('Modification enregistré!', 'Success!');
                this.isLoading = false;
              },
              error: (err) => {
                this.isLoading = false;
                this.toastr.error(`${err.error.message}`, 'Oupss!');
                console.log(err);
              }
            });
          },
          error: err => {
            console.log(err);
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            this.isLoading = false;
          }
        });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  findValue(value: number) {
    this.idItem = value;
    this.usersService.get(this.idItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        fullname: this.dataItem.fullname,
        email: this.dataItem.email,
        title: this.dataItem.title,
        phone: this.dataItem.phone,
        password: this.dataItem.password,
        province_id: this.dataItem.province_id,
        area_id: this.dataItem.area_id,
        sup_id: this.dataItem.sup_id,
        // pos_id: this.dataItem.pos_id,
        role: this.dataItem.title, // Role et title c'est la meme chose mais le role cest pour le code source
        permission: this.dataItem.permission,
        // image: this.imageUrl,
        status: this.dataItem.status,
        is_manager: this.dataItem.is_manager,
      });
    }
    );
  }



  delete(): void {
    this.usersService
      .delete(this.idItem)
      .subscribe({
        next: () => {
          this.logActivity.activity(
            'Users',
            this.currentUser.id,
            'deleted',
            `Delete user id: ${this.idItem}`,
            this.currentUser.fullname
          ).subscribe({
            next: () => {
              this.formGroup.reset();
              this.toastr.info('Supprimé avec succès!', 'Success!');
              this.isLoading = false;
            },
            error: (err) => {
              this.isLoading = false;
              this.toastr.error(`${err.error.message}`, 'Oupss!');
              console.log(err);
            }
          });

        },
        error: err => {
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          console.log(err);
        }
      }
      );
  }


  onProvinceChange(event: any) {
    const areaArray = this.areaList.filter((v) => v.province_id == event.value);
    this.areaListFilter = areaArray.filter((obj, index, self) =>
      index === self.findIndex((t) => t.name === obj.name)
    );
    console.log("areaListFilter", this.areaListFilter);

    const supArray = this.supList.filter((v) => v.province_id == event.value);
    this.supListFilter = supArray.filter((obj, index, self) =>
      index === self.findIndex((t) => t.name === obj.name)
    );

  }

  compareFn(c1: IProvince, c2: IProvince): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }

  compareFnArea(c1: IArea, c2: IArea): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }

  compareFnSup(c1: ISup, c2: ISup): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }

  compareFnPOS(c1: IPos, c2: IPos): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }
}
