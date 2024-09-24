import { Component, Input, OnInit } from '@angular/core';
import { IArea } from '../../areas/models/area.model';
import { AreaService } from '../../areas/area.service';

@Component({
  selector: 'app-posform-area',
  templateUrl: './posform-area.component.html',
  styleUrl: './posform-area.component.scss'
})
export class PosformAreaComponent implements OnInit {
  @Input() idArea!: number;

  dataItem!: IArea;

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.areaService.get(this.idArea).subscribe(res => {
      this.dataItem = res.data;
    });
  }

}