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
import { IPos } from '../models/pos.model';
import { AreaService } from '../../areas/area.service';
import { PosVenteService } from '../pos-vente.service';
import { IArea } from '../../areas/models/area.model';

@Component({
  selector: 'app-pos-vente-list',
  templateUrl: './pos-vente-list.component.html',
  styleUrl: './pos-vente-list.component.scss'
})
export class PosVenteListComponent implements OnInit {
  public routes = routes;
  text: string | undefined;
  public tableData: IPos[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<IPos>;
  public searchDataValue = '';
  public tableDataCopy: IPos[] = [];
  public actualData: IPos[] = [];
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();

  idItem!: number;
  dataItem!: IPos; // Single data

  constructor(
    private pagination: PaginationService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private posVenteService: PosVenteService,
    public provinceService: ProvinceService,
    private areaService: AreaService,
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


  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

  totalUser = 0;
  provinceList: IProvince[] = [];
  areaList: IArea[] = [];
  areaListFilter: IArea[] = [];
 

  ngOnInit() {
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
      inputgroupselector: ['', Validators.required],
      cparasol: [''],
      ctable: [''],
      ckiosk: [''],
      province_id: ['', Validators.required],
      area_id: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.provinceService.getAll().subscribe(res => {
          this.provinceList = res.data;
        });
        this.areaService.getAll().subscribe(res => {
          this.areaList = res.data;
        });
        this.posVenteService.refreshDataList$.subscribe(() => {
          this.posVenteService.getAll().subscribe((apiRes: apiResultFormat) => {
            this.actualData = apiRes.data;
            this.totalUser = apiRes.meta.total;
            this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
              if (this.router.url == this.routes.posVente) {
                this.getTableData({ skip: res.skip, limit: res.limit });
                this.pageSize = res.pageSize;
              }
            });
          });
        });
        this.posVenteService.getAll().subscribe((apiRes: apiResultFormat) => {
          this.actualData = apiRes.data;
          this.totalUser = apiRes.meta.total;
          this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
            if (this.router.url == this.routes.posVente) {
              this.getTableData({ skip: res.skip, limit: res.limit });
              this.pageSize = res.pageSize;
            }
          });
        });
        if (this.idItem) {
          this.posVenteService.get(this.idItem).subscribe(item => {
            this.dataItem = item.data;
            this.formGroup.patchValue({
              name: this.dataItem.name,
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
              province_id: this.dataItem.province_id,
              area_id: this.dataItem.area_id,
              status: this.dataItem.status,
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
    this.posVenteService.getAll().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: IPos, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.ID = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<IPos>(this.actualData);
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
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          signature: this.currentUser.fullname,
        };
        this.posVenteService.create(body).subscribe({
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
        status: (this.formGroup.value.status) ? this.formGroup.value.status : false, 
        signature: this.currentUser.fullname,
      };
      this.posVenteService.update(this.idItem, body)
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
          }
          );
        }
      }
    });
  }

  delete(): void {
    this.posVenteService
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

