import { Component, Input, OnInit } from '@angular/core';
import { AreaService } from '../../areas/area.service';
import { IArea } from '../../areas/models/area.model';

@Component({
  selector: 'app-area-count',
  templateUrl: './area-count.component.html',
  styleUrl: './area-count.component.scss'
})
export class AreaCountComponent implements OnInit {
  @Input() id!: number;

  areaList: IArea[] = []; 
  totalArea = 0; 

  constructor( 
    private aresService: AreaService, 
  ) { 
  }

  ngOnInit(): void {
    this.aresService.getAllById(this.id).subscribe(res => {
      this.areaList = res.data;
      this.totalArea = this.areaList.length
    })
  }

 
}
