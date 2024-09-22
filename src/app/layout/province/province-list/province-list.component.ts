import { Component, OnInit, ViewChild } from '@angular/core';
import { apiResultFormat } from '../../../shared/model/pages.model';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService, pageSelection, tablePageSize } from '../../../shared/custom-pagination/pagination.service';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { routes } from '../../../shared/routes/routes';
import { IProvince } from '../models/province.model';
import { ProvinceService } from '../province.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../auth/models/user.model';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrl: './province-list.component.scss'
})
export class ProvinceListComponent implements OnInit {
  isLoadingData = false;
  public routes = routes;
  // Table 
  dataList: IProvince[] = [];
  totalItems: number = 0;
  pageSize: number = 15;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  dataSource = new MatTableDataSource<IProvince>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public searchDataValue = '';

  // Forms  
  idItem!: number;
  dataItem!: IProvince; // Single data 

  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

  
  constructor(
    private pagination: PaginationService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private provinceService: ProvinceService,
    private toastr: ToastrService
  ) { 
  }

  selectedValue1: any[] | undefined;
  selectedValue2: any[] | undefined;
  selectedValue3: any[] | undefined;
  selectedValue4: any[] | undefined;

  selectedDatas1: any[] | undefined;
  selectedDatas2: any[] | undefined;
  selectedDatas3: any[] | undefined;
  selectedDatas4: any[] | undefined; 
  

  ngAfterViewInit(): void { 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.provinceService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.pageIndex, this.pageSize);
        });
        this.fetchProducts(this.pageIndex, this.pageSize); 
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
      name: ['', Validators.required], 
    });
 

    this.selectedValue1 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
    this.selectedValue2 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
    this.selectedValue3 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
    this.selectedValue4 = [
      { name: 'Choose' },
      { name: 'Contracts under Seal' },
      { name: 'Meeting' }
    ];
  }


  onPageChange(event: PageEvent): void {
    this.isLoadingData = true; 
    this.fetchProducts(event.pageIndex, event.pageSize);
  } 

  fetchProducts(pageIndex: number, pageSize: number) {
    this.provinceService.getPaginated(pageIndex, pageSize).subscribe(res => {
      this.dataList = res.data;
      this.totalItems = res.pagination.total_pages;
      this.length = res.pagination.length;
      this.dataSource = new MatTableDataSource<IProvince>(this.dataList);
      //  this.dataSource.paginator = this.paginator; 
      this.paginator.length = res.pagination.length;
      this.dataSource.sort = this.sort; 

      this.isLoadingData = false;
    });
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

  public searchData(value: string): void {
    if (value == '') {
      this.dataList = this.dataList;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.dataList = this.dataSource.filteredData;
    }
  }


  public sidebarPopup = false;
  public sidebarPopup2 = false;
  openSidebarPopup() {
    this.sidebarPopup = !this.sidebarPopup;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }  
 
  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = { 
          name: this.formGroup.value.name.toLowerCase(), 
          signature: this.currentUser.fullname,
        };
        this.provinceService.create(body).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Ajouter avec succès!', 'Success!'); 
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
        name: this.formGroup.value.name.toLowerCase(), 
        signature: this.currentUser.fullname,
      };
      this.provinceService.update(this.idItem, body)
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
 
  findValue(value: number) {
    this.idItem = value;
    this.provinceService.get(this.idItem).subscribe(item => { 
      this.dataItem = item.data;
        this.formGroup.patchValue({
          name: this.dataItem.name,  
        });
      }
    );
  }

 

  delete(): void {
    this.provinceService
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

  compareFn(c1: IProvince, c2: IProvince): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }
}
