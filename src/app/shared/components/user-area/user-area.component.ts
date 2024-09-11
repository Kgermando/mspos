import { Component, Input, OnInit } from '@angular/core'; 
import { AreaService } from '../../../layout/areas/area.service';
import { IArea } from '../../../layout/areas/models/area.model';

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
