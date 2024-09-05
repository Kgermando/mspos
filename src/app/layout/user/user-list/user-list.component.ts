import { ChangeDetectionStrategy, Component, model, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  apiResultFormat,
} from '../../../shared/model/pages.model';
import { routes } from '../../../shared/routes/routes';
import {
  PaginationService,
  tablePageSize,
  pageSelection,
} from '../../../shared/shared.index';
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
import { PosVenteService } from '../../pos-vente/pos-vente.service';
import { IPermission, permissions } from '../../../shared/model/permission.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  isLoadingData = false;
  public routes = routes;
  // pagination variables
  public tableData: IUser[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<IUser>;
  public searchDataValue = '';
  public tableDataCopy: IUser[] = [];
  public actualData: IUser[] = [];
  public totalUser: number = 0;
  //** pagination variables
  initChecked = false;
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;
  public password: boolean[] = [false];

  idItem!: number;
  dataItem!: IUser; // Single data


  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

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
  posList: IPos[] = [];
  posListFilter: IPos[] = [];

  isManager = false; 


  constructor(
    private pagination: PaginationService,
    private router: Router,
    private authService: AuthService,
    private usersService: UserService,
    public provinceService: ProvinceService,
    private areaService: AreaService,
    private supService: SupService,
    private posService: PosVenteService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {

  }


  ngOnInit(): void {
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
      pos_id: [''],
      // role: ['', Validators.required], // Utilise deja Title
      permission: ['', Validators.required],
      // image: [''], 
      status: [''],
      is_manager: [''],
    }); 

    this.provinceService.getAll().subscribe(res => {
      this.provinceList = res.data;
    });
    this.areaService.getAll().subscribe(res => {
      this.areaList = res.data;
    });
    this.supService.getAll().subscribe(res => {
      this.supList = res.data;
    });
    this.posService.getAll().subscribe(res => {
      this.posList = res.data;
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user; 
        this.isLoadingData = true;
        this.usersService.refreshDataList$.subscribe(() => {
          this.usersService.getAll().subscribe((apiRes: apiResultFormat) => {
            this.actualData = apiRes.data;
            this.totalUser = apiRes.meta.total;
            this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
              if (this.router.url == this.routes.userList) {
                this.getTableData({ skip: res.skip, limit: res.limit });
                this.pageSize = res.pageSize;
              }
            });
          });
        });
        this.usersService.getAll().subscribe((apiRes: apiResultFormat) => {
          this.actualData = apiRes.data;
          this.totalUser = apiRes.meta.total;
          this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
            if (this.router.url == this.routes.userList) {
              this.getTableData({ skip: res.skip, limit: res.limit });
              this.pageSize = res.pageSize;
            }
          });
        });

      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

  }


  private getTableData(pageOption: pageSelection): void {
    this.usersService.getAll().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: IUser, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.ID = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<IUser>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
      this.isLoadingData = false
    });
   
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
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
          pos_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.pos_id), 
          role: this.formGroup.value.title, // Role et title c'est la meme chose mais le role cest pour le code source
          permission: this.formGroup.value.permission,
          // image: this.imageUrl,  
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          is_manager: (this.formGroup.value.is_manager) ? this.formGroup.value.is_manager : false,
          signature: this.currentUser.fullname,
        };
        this.usersService.create(body).subscribe({ 
          next: (res) => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Ajouter avec succès!', 'Success!');
            // this.router.navigate(['/web/actualites/list']);
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
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
          pos_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.pos_id), 
          role: this.formGroup.value.title, // Role et title c'est la meme chose mais le role cest pour le code source
          permission: this.formGroup.value.permission,
          // image: this.imageUrl,  
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          is_manager: (this.formGroup.value.is_manager) ? this.formGroup.value.is_manager : false,
          signature: this.currentUser.fullname,
      };
      this.usersService.update(this.idItem, body)
        .subscribe({
          next: () => {
            this.formGroup.reset();
            this.toastr.success('Modification enregistré!', 'Success!');
            this.isLoading = false;
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

  findValue(value: string) {
    this.actualData.forEach(item => {
      if (item.fullname === value) {
        this.idItem = item.ID;
        if (this.idItem) {
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
              pos_id: this.dataItem.pos_id,
              role: this.dataItem.title, // Role et title c'est la meme chose mais le role cest pour le code source
              permission: this.dataItem.permission,
              // image: this.imageUrl,  
              status: this.dataItem.status,
              is_manager: this.dataItem.is_manager,
            });
          }
          );
        }
      }
    });
  }



  delete(): void {
    this.usersService
      .delete(this.idItem)
      .subscribe({
        next: () => {
          this.toastr.info('Supprimé avec succès!', 'Success!');
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

  onAreaChange(event: any) {
    const posArray = this.posList.filter((v) => v.area_id == event.value);
    this.posListFilter = posArray.filter((obj, index, self) =>
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
