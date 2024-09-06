import { Component, OnInit } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { IProvince } from '../../layout/province/models/province.model';
import { IArea } from '../../layout/areas/models/area.model';
import { ISup } from '../../layout/sups/models/sup.model';
import { IPos } from '../../layout/pos-vente/models/pos.model';
import { ProvinceService } from '../../layout/province/province.service';
import { AreaService } from '../../layout/areas/area.service';
import { SupService } from '../../layout/sups/sup.service';
import { PosVenteService } from '../../layout/pos-vente/pos-vente.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  dateY = "";
  public routes = routes;
  isLoading = false;

  formGroup!: FormGroup;

  provinceList: IProvince[] = [];
  areaList: IArea[] = [];
  areaListFilter: IArea[] = [];
  supList: ISup[] = [];
  supListFilter: ISup[] = [];
  posList: IPos[] = [];
  posListFilter: IPos[] = [];

  isManager = false; 

  public password: boolean[] = [false];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private provinceService: ProvinceService,
    private areaService: AreaService,
    private supService: SupService,
    private posService: PosVenteService,
    private toastr: ToastrService
  ) {
    this.dateY = formatDate(new Date(), 'yyyy', 'en');
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required], 
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
      province_id: [''],
      area_id: [''],
      sup_id: [''],
      pos_id: [''],
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
  }
 

  public togglePassword(index: number) {
    this.password[index] = !this.password[index]
  }


  onChangeCheck(event: any) { 
    this.isManager = event.target.checked;
  }


  onProvinceChange(event: any) {
    const areaArray = this.areaList.filter((v) => v.province_id == event.value);
    this.areaListFilter = areaArray.filter((obj, index, self) =>
      index === self.findIndex((t) => t.name === obj.name)
    );
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


  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = {
          fullname: this.formGroup.value.fullname,
          email: this.formGroup.value.email,
          title: 'DR',
          phone: this.formGroup.value.phone,
          password: this.formGroup.value.password,
          password_confirm: this.formGroup.value.password_confirm,
          province_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.province_id),
          area_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.area_id), 
          sup_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.sup_id), 
          pos_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.pos_id), 
          role: 'DR', // Role et title c'est la meme chose mais le role cest pour le code source
          permission: 'V',
          status: false,
          is_manager: (this.formGroup.value.is_manager) ? this.formGroup.value.is_manager : false,
          signature: this.formGroup.value.fullname,
        };
        this.authService.register(body).subscribe({ 
          next: (res) => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Compte cree avec succès! \n Contactez-votre adminstrateur', 'Success!');
            this.navigate();
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

  private navigate() {
    this.router.navigate([routes.login]);
  }
}
