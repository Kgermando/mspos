import { Component, Input, OnInit } from '@angular/core';
import { IPos } from '../../pos-vente/models/pos.model';
import { PosVenteService } from '../../pos-vente/pos-vente.service';

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
