import { Component, Input, OnInit } from '@angular/core';
import { IArea } from '../models/area.model';
import { AreaService } from '../area.service';

@Component({
  selector: 'app-sup-area-count',
  templateUrl: './sup-area-count.component.html',
  styleUrl: './sup-area-count.component.scss'
})
export class SupAreaCountComponent implements OnInit {
  @Input() id!: number;

  areaList: IArea[] = [];
  totalArea = 0;

  constructor(
    private areaService: AreaService,
  ) {
  }

  ngOnInit(): void {
    this.areaService.getAllSupAreaById(this.id).subscribe(res => {
      this.areaList = res.data;
      this.totalArea = this.areaList.length
    })
  }
}
