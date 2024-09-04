import { Component, Input, OnInit } from '@angular/core';
import { ProvinceService } from '../../../layout/province/province.service';
import { IProvince } from '../../../layout/province/models/province.model';

@Component({
  selector: 'app-province-user',
  templateUrl: './province-user.component.html',
  styleUrl: './province-user.component.scss'
})
export class ProvinceUserComponent implements OnInit {

  @Input() province_id!: number;

  province!: IProvince;

  constructor(private provinceService: ProvinceService) { }


  ngOnInit(): void {
    this.provinceService.get(this.province_id).subscribe((res) => {
      this.province = res.data;
    });
  }
}
