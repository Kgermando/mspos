import { Component, OnInit } from '@angular/core';
import { apiResultFormat } from '../../../shared/model/pages.model';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService, pageSelection, tablePageSize } from '../../../shared/custom-pagination/pagination.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
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


@Component({
  selector: 'app-sup-list',
  templateUrl: './sup-list.component.html',
  styleUrl: './sup-list.component.scss'
})
export class SupListComponent implements OnInit {
  public routes = routes;
  text: string | undefined;
  public tableData: ISup[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<ISup>;
  public searchDataValue = '';
  public tableDataCopy: ISup[] = [];
  public actualData: ISup[] = [];
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();


  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

  totalUser = 0;
  provinceList: IProvince[] = [];
  asmList: IAsm[] = []; 
  

  idItem!: number;
  dataItem!: ISup; // Single data

  constructor(
    private pagination: PaginationService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    public supService: SupService, 
    private provinceService: ProvinceService,
    private asmService: AsmService,
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


   
  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required], 
      province_id: ['', Validators.required], 
      asm_id: ['', Validators.required], 
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.provinceService.getAll().subscribe(res => {
          this.provinceList = res.data;
        });
        this.asmService.getAll().subscribe(res => {
          this.asmList = res.data;
        });
        this.supService.refreshDataList$.subscribe(() => {
          this.supService.getAll().subscribe((apiRes: apiResultFormat) => {
            this.actualData = apiRes.data;  
            this.totalUser = apiRes.meta.total;
            this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
              if (this.router.url == this.routes.supList) {
                this.getTableData({ skip: res.skip, limit: res.limit });
                this.pageSize = res.pageSize;
              }
            });
          });
        }); 
        this.supService.getAll().subscribe((apiRes: apiResultFormat) => {
          this.actualData = apiRes.data;  
          this.totalUser = apiRes.meta.total;
          this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
            if (this.router.url == this.routes.supList) {
              this.getTableData({ skip: res.skip, limit: res.limit });
              this.pageSize = res.pageSize;
            }
          });
        });
        console.log("id", this.idItem)
        if (this.idItem) {
          this.supService.get(this.idItem).subscribe(item => { 
            this.dataItem = item.data;
              this.formGroup.patchValue({
                name: this.dataItem.name, 
                province_id: this.dataItem.province_id,  
                asm_id: this.dataItem.asm_id,  
              });
            }
          );
        }
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    }); 
    
   
    
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

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
 

  private getTableData(pageOption: pageSelection): void {
    this.supService.getAll().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: ISup, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.ID = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<ISup>(this.actualData);
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
  public sidebarPopup = false;
  public sidebarPopup2 = false;
  openSidebarPopup() {
    this.sidebarPopup = !this.sidebarPopup;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }
  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }
  initChecked = false;
 
 
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
        name: this.formGroup.value.name, 
        province_id: parseInt(this.formGroup.value.province_id), 
        asm_id: parseInt(this.formGroup.value.asm_id), 
        signature: this.currentUser.fullname,
      };
      this.supService.update(this.idItem, body)
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
      if (item.name === value) {
        this.idItem = item.ID;
        if (this.idItem) {
          this.supService.get(this.idItem).subscribe(item => { 
            this.dataItem = item.data;
              this.formGroup.patchValue({
                name: this.dataItem.name, 
                province_id: this.dataItem.province_id,  
              });
            }
          );
        }
      }
    });
  }

 

  delete(): void {
    this.supService
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

  compareFn1(c1: IAsm, c2: IAsm): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }

}
