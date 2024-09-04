import { Component, Input, input, OnInit } from '@angular/core';
import { AreaService } from '../../areas/area.service';
import { IArea } from '../../areas/models/area.model';

@Component({
  selector: 'app-are-pos',
  templateUrl: './are-pos.component.html',
  styleUrl: './are-pos.component.scss'
})
export class ArePosComponent implements OnInit {
  @Input() id!: number;

  area!: IArea;
  
  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.areaService.get(this.id).subscribe(res => {
      this.area = res.data;
    }) ;
  }

}
