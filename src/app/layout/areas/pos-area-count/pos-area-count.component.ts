import { Component, Input, OnInit } from '@angular/core';
import { IPos } from '../../pos-vente/models/pos.model';
import { PosVenteService } from '../../pos-vente/pos-vente.service';

@Component({
  selector: 'app-pos-area-count',
  templateUrl: './pos-area-count.component.html',
  styleUrl: './pos-area-count.component.scss'
})
export class PosAreaCountComponent implements OnInit {
  @Input() id!: number;

  posList: IPos[] = [];
  totalPOS = 0;

  constructor(
    private posService: PosVenteService,
  ) {
  }


  ngOnInit(): void {
    this.posService.getAllAreaById(this.id).subscribe(res => {
      this.posList = res.data;
      this.totalPOS = this.posList.length
    })
  }
}
