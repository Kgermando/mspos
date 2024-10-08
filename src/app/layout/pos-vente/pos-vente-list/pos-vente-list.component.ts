import { Component, OnInit, ViewChild } from '@angular/core';
import { apiResultFormat } from '../../../shared/model/pages.model';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService, pageSelection, tablePageSize } from '../../../shared/custom-pagination/pagination.service';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { routes } from '../../../shared/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../auth/models/user.model';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IProvince } from '../../province/models/province.model';
import { ProvinceService } from '../../province/province.service';
import { IPos } from '../models/pos.model';
import { AreaService } from '../../areas/area.service';
import { PosVenteService } from '../pos-vente.service';
import { IArea } from '../../areas/models/area.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LogsService } from '../../user-logs/logs.service';

@Component({
  selector: 'app-pos-vente-list',
  templateUrl: './pos-vente-list.component.html',
  styleUrl: './pos-vente-list.component.scss'
})
export class PosVenteListComponent implements OnInit {
  isLoadingData = false;
  public routes = routes;
  // Table 
  dataList: IPos[] = [];
  totalItems: number = 0;
  pageSize: number = 15;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  displayedColumns: string[] = ['status', 'province', 'name', 'area', 'shop', 'manager', 'commune', 'avenue', 'quartier', 'reference', 'telephone', 'inputgroupselector', 'eparasol', 'etable', 'ekiosk', 'cparasol', 'ctable', 'ckiosk', 'id'];
  dataSource = new MatTableDataSource<IPos>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public searchDataValue = '';

  // Forms  
  idItem!: number;
  dataItem!: IPos; // Single data 

  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

  provinceList: IProvince[] = [];
  areaList: IArea[] = [];
  areaListFilter: IArea[] = [];


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private posVenteService: PosVenteService,
    public provinceService: ProvinceService,
    private areaService: AreaService,
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
        this.posVenteService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.currentUser, this.pageIndex, this.pageSize);
        });
        this.fetchProducts(this.currentUser, this.pageIndex, this.pageSize);

        this.provinceService.getAll().subscribe(res => {
          this.provinceList = res.data;
        });
        this.areaService.getAll().subscribe(res => {
          this.areaList = res.data;
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
      shop: ['', Validators.required],
      manager: ['', Validators.required],
      commune: ['', Validators.required],
      avenue: ['', Validators.required],
      quartier: ['', Validators.required],
      reference: ['', Validators.required],
      telephone: ['', Validators.required],
      eparasol: [''],
      etable: [''],
      ekiosk: [''],
      inputgroupselector: [''],
      cparasol: [''],
      ctable: [''],
      ckiosk: [''],
      province_id: ['', Validators.required],
      area_id: ['', Validators.required],
      status: ['', Validators.required],
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
    this.fetchProducts(this.currentUser, event.pageIndex, event.pageSize);
  }

  fetchProducts(currentUser: UserModel, pageIndex: number, pageSize: number) {
    if (currentUser.role == 'Manager') {
      this.posVenteService.getPaginated(pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IPos>(this.dataList);  
        this.dataSource.sort = this.sort;
  
        this.isLoadingData = false;
      });

    } else if (currentUser.role == 'ASM') {
      this.posVenteService.getPaginatedByProvinceId(currentUser.province_id, pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IPos>(this.dataList);  
        this.dataSource.sort = this.sort;
  
        this.isLoadingData = false;
      });
    } else if (currentUser.role == 'Supervisor') {
      this.posVenteService.getPaginatedBySupId(currentUser.area_id, pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IPos>(this.dataList);  
        this.dataSource.sort = this.sort;
  
        this.isLoadingData = false;
      });
    }  else if (currentUser.role == 'DR') {
      this.posVenteService.getPaginatedById(currentUser.id, pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IPos>(this.dataList);  
        this.dataSource.sort = this.sort;
  
        this.isLoadingData = false;
      });
    } else {
      this.posVenteService.getPaginated(pageIndex, pageSize).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IPos>(this.dataList);  
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
          shop: this.formGroup.value.shop,
          manager: this.formGroup.value.manager,
          commune: this.formGroup.value.commune,
          avenue: this.formGroup.value.avenue,
          quartier: this.formGroup.value.quartier,
          reference: this.formGroup.value.reference,
          telephone: this.formGroup.value.telephone,
          eparasol: (this.formGroup.value.eparasol) ? this.formGroup.value.eparasol: false,
          etable: (this.formGroup.value.etable) ? this.formGroup.value.etable : false,
          ekiosk: (this.formGroup.value.ekiosk) ? this.formGroup.value.ekiosk : false,
          inputgroupselector: this.formGroup.value.inputgroupselector,
          cparasol: (this.formGroup.value.cparasol) ? this.formGroup.value.cparasol : false,
          ctable: (this.formGroup.value.ctable) ? this.formGroup.value.ctable : false,
          ckiosk: (this.formGroup.value.ckiosk) ? this.formGroup.value.ckiosk : false,
          province_id: parseInt(this.formGroup.value.province_id),
          area_id: parseInt(this.formGroup.value.area_id),
          user_id: this.currentUser.id,
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          signature: this.currentUser.fullname,
        };
        this.posVenteService.create(body).subscribe({
          next: (res) => {
            this.logActivity.activity(
              'POS',
              this.currentUser.id,
              'created', 
              `Created new pos id: ${res.data.ID}`,
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
        shop: this.formGroup.value.shop,
        manager: this.formGroup.value.manager,
        commune: this.formGroup.value.commune,
        avenue: this.formGroup.value.avenue,
        quartier: this.formGroup.value.quartier,
        reference: this.formGroup.value.reference,
        telephone: this.formGroup.value.telephone,
        eparasol: this.formGroup.value.eparasol,
        etable: this.formGroup.value.etable,
        ekiosk: this.formGroup.value.ekiosk,
        inputgroupselector: this.formGroup.value.inputgroupselector,
        cparasol: this.formGroup.value.cparasol,
        ctable: this.formGroup.value.ctable,
        ckiosk: this.formGroup.value.ckiosk,
        province_id: parseInt(this.formGroup.value.province_id),
        area_id: parseInt(this.formGroup.value.area_id),
        user_id: this.currentUser.id,
        status: (this.formGroup.value.status) ? this.formGroup.value.status : false, 
        signature: this.currentUser.fullname,
      };
      this.posVenteService.update(this.idItem, body)
        .subscribe({
          next: (res) => {
            this.logActivity.activity(
              'POS',
              this.currentUser.id,
              'updated', 
              `Updated Pos id: ${res.data.ID}`,
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
    this.posVenteService.get(this.idItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        name: this.dataItem.name,
        province_id: this.dataItem.province_id,
        area_id: this.dataItem.area_id,
        shop: this.dataItem.shop,
        manager: this.dataItem.manager,
        commune: this.dataItem.commune,
        avenue: this.dataItem.avenue,
        quartier: this.dataItem.quartier,
        reference: this.dataItem.reference,
        telephone: this.dataItem.telephone,
        eparasol: this.dataItem.eparasol,
        etable: this.dataItem.etable,
        ekiosk: this.dataItem.ekiosk,
        inputgroupselector: this.dataItem.inputgroupselector,
        cparasol: this.dataItem.cparasol,
        ctable: this.dataItem.ctable,
        ckiosk: this.dataItem.ckiosk,
        status: this.dataItem.status,
      });
    }); 
  }

  delete(): void {
    this.posVenteService
      .delete(this.idItem)
      .subscribe({
        next: () => {
          this.logActivity.activity(
            'POS',
            this.currentUser.id,
            'deleted', 
            `Delete pos id: ${this.idItem}`,
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
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }

  compareFn2(c1: IArea, c2: IArea): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }



  onProvinceChange(event: any) {
    const areaArray = this.areaList.filter((v) => v.province_id == event.value);
    this.areaListFilter = areaArray.filter((obj, index, self) =>
      index === self.findIndex((t) => t.name === obj.name)
    );
  } 

}

