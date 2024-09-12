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
import { IPosForm } from '../models/posform.models';
import { PosformService } from '../posform.service';
import { IUser } from '../../user/models/user.model';
import { IArea } from '../../areas/models/area.model';
import { ISup } from '../../sups/models/sup.model';
import { IPos } from '../../pos-vente/models/pos.model';
import { generateRandomString } from '../../../utils/generate-random';
import { PosVenteService } from '../../pos-vente/pos-vente.service';


@Component({
  selector: 'app-postform-list',
  templateUrl: './postform-list.component.html',
  styleUrl: './postform-list.component.scss'
})
export class PostformListComponent implements OnInit {
  public routes = routes;
  text: string | undefined;
  public tableData: IPosForm[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<IPosForm>;
  public searchDataValue = '';
  public tableDataCopy: IPosForm[] = [];
  public actualData: IPosForm[] = [];
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();


  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

  totalUser = 0;
  idItem!: number;
  dataItem!: IPosForm; // Single data


  userList: IUser[] = [];
  provinceList: IProvince[] = [];
  areaList: IArea[] = [];
  supList: ISup[] = [];
  posList: IPos[] = []; 
  posListFilter: IPos[] = [];

  constructor(
    private pagination: PaginationService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    public posformService: PosformService,
    private posService: PosVenteService,
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
      pos_id: ['', Validators.required],
      eq: ['', Validators.required],
      sold: ['', Validators.required],
      dhl: ['', Validators.required],
      ar: ['', Validators.required],
      sbl: ['', Validators.required],
      pmf: ['', Validators.required],
      ticket: ['', Validators.required],
      mtc: ['', Validators.required],
      ws: ['', Validators.required],
      mast: ['', Validators.required],
      oris: ['', Validators.required],
      elite: ['', Validators.required], 
      yes: ['', Validators.required],
      time: ['', Validators.required],
      comment: ['Rien à signaler', Validators.required],
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.posService.getAll().subscribe(res => {
          this.posList = res.data;
          this.posListFilter = this.posList.filter((v) => v.area_id == this.currentUser.area_id)
        });
        this.posformService.refreshDataList$.subscribe(() => {
          this.posformService.getAll().subscribe((apiRes: apiResultFormat) => {
            this.actualData = apiRes.data;
            this.totalUser = apiRes.meta.total;
            this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
              if (this.router.url == this.routes.posForm) {
                this.getTableData({ skip: res.skip, limit: res.limit });
                this.pageSize = res.pageSize;
              }
            });
          });
        });
        this.posformService.getAll().subscribe((apiRes: apiResultFormat) => {
          this.actualData = apiRes.data;
          this.totalUser = apiRes.meta.total;
          this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
            if (this.router.url == this.routes.posForm) {
              this.getTableData({ skip: res.skip, limit: res.limit });
              this.pageSize = res.pageSize;
            }
          });
        });
        if (this.idItem) {
          this.posformService.get(this.idItem).subscribe(item => {
            this.dataItem = item.data;
            this.formGroup.patchValue({
              // id_unique: this.dataItem.id_unique,  
              pos_id: this.dataItem.pos_id,
              eq: this.dataItem.eq,
              eq1: this.dataItem.eq1,
              sold: this.dataItem.sold,
              dhl: this.dataItem.dhl,
              dhl1: this.dataItem.dhl1,
              ar: this.dataItem.ar,
              ar1: this.dataItem.ar1,
              sbl: this.dataItem.sbl,
              sbl1: this.dataItem.sbl1,
              pmf: this.dataItem.pmf,
              pmf1: this.dataItem.pmf1,
              ticket: this.dataItem.ticket,
              ticket1: this.dataItem.ticket1,
              mtc: this.dataItem.mtc,
              mtc1: this.dataItem.mtc1,
              ws: this.dataItem.ws,
              ws1: this.dataItem.ws1,
              mast: this.dataItem.mast,
              mast1: this.dataItem.mast1,
              oris: this.dataItem.oris,
              oris1: this.dataItem.oris1,
              elite: this.dataItem.elite, 
              elite1: this.dataItem.elite1, 
              yes: this.dataItem.yes,
              yes1: this.dataItem.yes1,
              time: this.dataItem.time,
              time1: this.dataItem.time1,
              comment: this.dataItem.comment,
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
    this.posformService.getAll().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: IPosForm, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.ID = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<IPosForm>(this.actualData);
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
          id_unique: generateRandomString(6),
          eq: parseInt(this.formGroup.value.eq),
          eq1: (parseInt(this.formGroup.value.eq) > 0 ? 1 : 0 ),
          sold: parseInt(this.formGroup.value.sold),
          dhl: parseInt(this.formGroup.value.dhl),
          dhl1: (parseInt(this.formGroup.value.dhl) > 0 ? 1 : 0 ),
          ar: parseInt(this.formGroup.value.ar),
          ar1: (parseInt(this.formGroup.value.ar) > 0 ? 1 : 0 ),
          sbl: parseInt(this.formGroup.value.sbl),
          sbl1: (parseInt(this.formGroup.value.sbl) > 0 ? 1 : 0 ),
          pmf: parseInt(this.formGroup.value.pmf),
          pmf1: (parseInt(this.formGroup.value.pmf) > 0 ? 1 : 0 ),
          ticket: parseInt(this.formGroup.value.ticket),
          ticket1: (parseInt(this.formGroup.value.ticket) > 0 ? 1 : 0 ),
          mtc: parseInt(this.formGroup.value.mtc),
          mtc1: (parseInt(this.formGroup.value.mtc) > 0 ? 1 : 0 ),
          ws: parseInt(this.formGroup.value.ws),
          ws1: (parseInt(this.formGroup.value.ws) > 0 ? 1 : 0 ),
          mast: parseInt(this.formGroup.value.mast),
          mast1: (parseInt(this.formGroup.value.mast) > 0 ? 1 : 0 ),
          oris: parseInt(this.formGroup.value.oris),
          oris1: (parseInt(this.formGroup.value.oris) > 0 ? 1 : 0 ),
          elite: parseInt(this.formGroup.value.elite), 
          elite1: (parseInt(this.formGroup.value.elite) > 0 ? 1 : 0 ), 
          yes: parseInt(this.formGroup.value.yes),
          yes1: (parseInt(this.formGroup.value.yes) > 0 ? 1 : 0 ),
          time: parseInt(this.formGroup.value.time),
          time1: (parseInt(this.formGroup.value.time) > 0 ? 1 : 0 ),
          comment: this.formGroup.value.comment,
          user_id: this.currentUser.id,
          province_id: this.currentUser.province_id,
          area_id: this.currentUser.area_id,
          sup_id: this.currentUser.sup_id,
          pos_id: parseInt(this.formGroup.value.pos_id),
          signature: this.currentUser.fullname,
        };
        this.posformService.create(body).subscribe({
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
        eq: parseInt(this.formGroup.value.eq),
        eq1: (parseInt(this.formGroup.value.eq) > 0 ? 1 : 0 ),
        sold: parseInt(this.formGroup.value.sold),
        dhl: parseInt(this.formGroup.value.dhl),
        dhl1: (parseInt(this.formGroup.value.dhl) > 0 ? 1 : 0 ),
        ar: parseInt(this.formGroup.value.ar),
        ar1: (parseInt(this.formGroup.value.ar) > 0 ? 1 : 0 ),
        sbl: parseInt(this.formGroup.value.sbl),
        sbl1: (parseInt(this.formGroup.value.sbl) > 0 ? 1 : 0 ),
        pmf: parseInt(this.formGroup.value.pmf),
        pmf1: (parseInt(this.formGroup.value.pmf) > 0 ? 1 : 0 ),
        ticket: parseInt(this.formGroup.value.ticket),
        ticket1: (parseInt(this.formGroup.value.ticket) > 0 ? 1 : 0 ),
        mtc: parseInt(this.formGroup.value.mtc),
        mtc1: (parseInt(this.formGroup.value.mtc) > 0 ? 1 : 0 ),
        ws: parseInt(this.formGroup.value.ws),
        ws1: (parseInt(this.formGroup.value.ws) > 0 ? 1 : 0 ),
        mast: parseInt(this.formGroup.value.mast),
        mast1: (parseInt(this.formGroup.value.mast) > 0 ? 1 : 0 ),
        oris: parseInt(this.formGroup.value.oris),
        oris1: (parseInt(this.formGroup.value.oris) > 0 ? 1 : 0 ),
        elite: parseInt(this.formGroup.value.elite),
        elite1: (parseInt(this.formGroup.value.elite) > 0 ? 1 : 0 ), 
        yes: parseInt(this.formGroup.value.yes),
        yes1: (parseInt(this.formGroup.value.yes) > 0 ? 1 : 0 ),
        time: parseInt(this.formGroup.value.time),
        time1: (parseInt(this.formGroup.value.time) > 0 ? 1 : 0 ),
        comment: this.formGroup.value.comment,
        user_id: this.currentUser.id,
        province_id: this.currentUser.province_id,
        area_id: this.currentUser.area_id,
        sup_id: this.currentUser.sup_id,
        pos_id: parseInt(this.formGroup.value.pos_id),
        signature: this.currentUser.fullname,
      };
      this.posformService.update(this.idItem, body)
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
      if (item.id_unique === value) {
        this.idItem = item.ID;
        if (this.idItem) {
          this.posformService.get(this.idItem).subscribe(item => {
            this.dataItem = item.data;
            this.formGroup.patchValue({
              // id_unique: this.dataItem.id_unique,  
              pos_id: this.dataItem.pos_id,
              eq: this.dataItem.eq,
              eq1: this.dataItem.eq1,
              sold: this.dataItem.sold,
              dhl: this.dataItem.dhl,
              dhl1: this.dataItem.dhl1,
              ar: this.dataItem.ar,
              ar1: this.dataItem.ar1,
              sbl: this.dataItem.sbl,
              sbl1: this.dataItem.sbl1,
              pmf: this.dataItem.pmf,
              pmf1: this.dataItem.pmf1,
              ticket: this.dataItem.ticket,
              ticket1: this.dataItem.ticket1,
              mtc: this.dataItem.mtc,
              mtc1: this.dataItem.mtc1,
              ws: this.dataItem.ws,
              ws1: this.dataItem.ws1,
              mast: this.dataItem.mast,
              mast1: this.dataItem.mast1,
              oris: this.dataItem.oris,
              oris1: this.dataItem.oris1,
              elite: this.dataItem.elite, 
              elite1: this.dataItem.elite1, 
              yes: this.dataItem.yes,
              yes1: this.dataItem.yes1,
              time: this.dataItem.time,
              time1: this.dataItem.time1,
              comment: this.dataItem.comment,
            });
          }
          );
        }
      }
    });
  }



  delete(): void {
    this.posformService
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


 

}
