import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
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
  public password : boolean[] = [false];


  deleteID!: number; // Get ID


  // Add Form;
  formGroupAdd!: FormGroup;
  currentUser!: UserModel;
  isLoadingAdd = false;

  isStatusList: boolean[] = [false, true];
  isTitleList: string[] = [
    'Manager',
    'ASM',
    'Supervisor',
    'DR',
    'Support'
  ];


  constructor( 
    private pagination: PaginationService,
    private router: Router,
    private authService: AuthService,
    private usersService: UserService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    
  }


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

    this.formGroupAdd = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required], 
      area_id: ['', Validators.required], 
      province_id: ['', Validators.required], 
      sup_id: ['', Validators.required], 
      pos_id: ['', Validators.required], 
      role: ['', Validators.required], 
      permission: ['', Validators.required], 
      image: ['', Validators.required], 
      status: ['', Validators.required],
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
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.status = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.status = false;
      });
    }
  }


  findValue(value: number) {
    this.tableData.forEach(item => {
      if (item.ID === value) {
        this.deleteID = item.ID;
      }
    });
  }

  onDelete(id: number) {
    return this.usersService.delete(id);
  }


  openSidebarPopup1() {
    this.sidebarPopup1 = !this.sidebarPopup1;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }






  onSubmitAdd() {
    try {
      if (this.formGroupAdd.valid) {
        this.isLoadingAdd = true;
        var body = { 
          fullname: this.formGroupAdd.value.fullname,
          email: this.formGroupAdd.value.email, 
          title: this.formGroupAdd.value.title,
          phone: this.formGroupAdd.value.phone,
          password: this.formGroupAdd.value.password,
          password_confirm: this.formGroupAdd.value.password_confirm,
          area_id: this.formGroupAdd.value.area_id,
          province_id: this.formGroupAdd.value.province_id,
          sup_id: this.formGroupAdd.value.sup_id,
          pos_id: this.formGroupAdd.value.pos_id,
          role: this.formGroupAdd.value.title, // Role et title c'est la meme chose mais le role cest pour le code source
          permission: this.formGroupAdd.value.permission, 
          // image: this.imageUrl,  
          status: this.formGroupAdd.value.status, 
          signature: this.currentUser.fullname,
        };
        this.usersService.create(body).subscribe({
          next: (res) => {
            this.isLoadingAdd = false;
            this.formGroupAdd.reset();
            this.toastr.success('Ajouter avec succès!', 'Success!');
            // this.router.navigate(['/web/actualites/list']);
          },
          error: (err) => {
            this.isLoadingAdd = false;
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            console.log(err);
          }
        });
      }
    } catch (error) {
      this.isLoadingAdd = false;
      console.log(error);
    }
  } 
}
