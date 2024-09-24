import { Component, Input, OnInit } from '@angular/core';
import { IProvince } from '../../province/models/province.model';
import { ProvinceService } from '../../province/province.service';

@Component({
  selector: 'app-posform-province',
  templateUrl: './posform-province.component.html',
  styleUrl: './posform-province.component.scss'
})
export class PosformProvinceComponent implements OnInit {
  @Input() idProvince!: number;

  dataItem!: IProvince;

  constructor(private provinceService: ProvinceService) {}

  ngOnInit(): void {
    this.provinceService.get(this.idProvince).subscribe(res => {
      this.dataItem = res.data;
    });
  }

}
