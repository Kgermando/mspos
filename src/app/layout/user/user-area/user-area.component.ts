import { Component, Input, OnInit } from '@angular/core';
import { IArea } from '../../areas/models/area.model';
import { AreaService } from '../../areas/area.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrl: './user-area.component.scss'
})
export class UserAreaComponent implements OnInit {
 @Input() id!: number;

 area!: IArea;

 constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.areaService.get(this.id).subscribe(res => {
      this.area = res.data;
    })
  }

}
