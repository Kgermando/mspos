import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { routes } from '../../../shared/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../auth/models/user.model';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr'; 
import { IProvince } from '../../province/models/province.model';
import { ProvinceService } from '../../province/province.service';
import { ISup } from '../models/sup.model';
import { SupService } from '../sup.service';
import { IAsm } from '../../asm/models/asm.model';
import { AsmService } from '../../asm/asm.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LogsService } from '../../user-logs/logs.service';


@Component({
  selector: 'app-sup-list',
  templateUrl: './sup-list.component.html',
  styleUrl: './sup-list.component.scss'
})
export class SupListComponent implements OnInit {
  isLoadingData = false;
  public routes = routes;
  // Table 
  dataList: ISup[] = [];
  totalItems: number = 0;
  pageSize: number = 15;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  displayedColumns: string[] = ['name', 'province', 'asm','id'];
  dataSource = new MatTableDataSource<ISup>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public searchDataValue = '';

  // Forms  
  idItem!: number;
  dataItem!: ISup; // Single data 

  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;
 
  provinceList: IProvince[] = [];
  asmList: IAsm[] = [];

  constructor( 
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    public supService: SupService, 
    private provinceService: ProvinceService,
    private asmService: AsmService,
    private logActivity: LogsService,
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
        this.supService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.currentUser, this.pageIndex, this.pageSize);
        });
        this.fetchProducts(this.currentUser, this.pageIndex, this.pageSize);

        this.provinceService.getAll().subscribe(res => {
          this.provinceList = res.data;
        });
        this.asmService.getAll().subscribe(res => {
          this.asmList = res.data;
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
      name: ['', Validators.required], 
      province_id: ['', Validators.required], 
      asm_id: ['', Validators.required], 
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
    this.fetchProducts(this.currentUser ,event.pageIndex, event.pageSize);
  } 

  fetchProducts(currentUser: UserModel ,pageIndex: number, pageSize: number) {
    if (currentUser.role == 'Manager') {
      this.supService.getPaginated(pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<ISup>(this.dataList);
        //  this.dataSource.paginator = this.paginator; 
        // this.paginator.length = res.pagination.length;
        this.dataSource.sort = this.sort; 
  
        this.isLoadingData = false;
      });

    } else if (currentUser.role == 'ASM') {
      this.supService.getPaginatedByProvinceId(currentUser.province_id, pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<ISup>(this.dataList); 
        // this.paginator.length = res.pagination.length;
        this.dataSource.sort = this.sort; 
  
        this.isLoadingData = false;
      }); 
    } else {
      this.supService.getPaginated(pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<ISup>(this.dataList); 
        // this.paginator.length = res.pagination.length;
        this.dataSource.sort = this.sort; 
  
        this.isLoadingData = false;
      });
    } 
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
          name: this.formGroup.value.name, 
          province_id: parseInt(this.formGroup.value.province_id), 
          asm_id: parseInt(this.formGroup.value.asm_id), 
          signature: this.currentUser.fullname,
        };
        this.supService.create(body).subscribe({
          next: (res) => {
            this.logActivity.activity(
              'Supervisor',
              this.currentUser.id,
              'created', 
              `Created new sup id: ${res.data.ID}`,
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
        name: this.formGroup.value.name, 
        province_id: parseInt(this.formGroup.value.province_id), 
        asm_id: parseInt(this.formGroup.value.asm_id), 
        signature: this.currentUser.fullname,
      };
      this.supService.update(this.idItem, body)
      .subscribe({
        next: (res) => {
          this.logActivity.activity(
            'Supervisor',
            this.currentUser.id,
            'updated', 
            `Updated sup id: ${res.data.ID}`,
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
    this.supService.get(this.idItem).subscribe(item => { 
      this.dataItem = item.data;
        this.formGroup.patchValue({
          name: this.dataItem.name, 
          province_id: this.dataItem.province_id,  
        });
      }
    );
    // this.dataList.forEach(item => { 
    //   if (item.name === value) {
    //     this.idItem = item.ID;
    //     if (this.idItem) {
    //       this.supService.get(this.idItem).subscribe(item => { 
    //         this.dataItem = item.data;
    //           this.formGroup.patchValue({
    //             name: this.dataItem.name, 
    //             province_id: this.dataItem.province_id,  
    //           });
    //         }
    //       );
    //     }
    //   }
    // });
  }

 

  delete(): void {
    this.supService
    .delete(this.idItem)
    .subscribe({
      next: () => {
        this.logActivity.activity(
          'Sup',
          this.currentUser.id,
          'deleted', 
          `Delete sup id: ${this.idItem}`,
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

  compareFn(c1: IProvince, c2: IProvince): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareFn1(c1: IAsm, c2: IAsm): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }

}
