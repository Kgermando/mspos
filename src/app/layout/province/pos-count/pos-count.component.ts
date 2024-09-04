import { Component, Input, OnInit } from '@angular/core';
import { PosVenteService } from '../../pos-vente/pos-vente.service';
import { IPos } from '../../pos-vente/models/pos.model';

@Component({
  selector: 'app-pos-count',
  templateUrl: './pos-count.component.html',
  styleUrl: './pos-count.component.scss'
})
export class PosCountComponent implements OnInit {
  @Input() id!: number;
 
  posList: IPos[] = []; 
  totalPOS = 0;

  constructor( 
    private posServce: PosVenteService,
  ) { 
  } 


  ngOnInit(): void {
    this.posServce.getAllById(this.id).subscribe(res => {
    this.posList = res.data;
    this.totalPOS = this.posList.length
  })
  }
}
