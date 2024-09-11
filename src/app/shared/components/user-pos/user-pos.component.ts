import { Component, Input, OnInit } from '@angular/core'; 
import { PosVenteService } from '../../../layout/pos-vente/pos-vente.service';
import { IPos } from '../../../layout/pos-vente/models/pos.model';

@Component({
  selector: 'app-user-pos',
  templateUrl: './user-pos.component.html',
  styleUrl: './user-pos.component.scss'
})
export class UserPosComponent implements OnInit {
  @Input() id!: number;
 
  pos!: IPos;
 
  constructor(private posVenteService: PosVenteService) {}
 
   ngOnInit(): void {
     this.posVenteService.get(this.id).subscribe(res => {
       this.pos = res.data;
     })
   }
 
 }
