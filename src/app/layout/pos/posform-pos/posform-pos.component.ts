import { Component, Input, OnInit } from '@angular/core'; 
import { IPos } from '../../pos-vente/models/pos.model';
import { PosVenteService } from '../../pos-vente/pos-vente.service';

@Component({
  selector: 'app-posform-pos',
  templateUrl: './posform-pos.component.html',
  styleUrl: './posform-pos.component.scss'
})
export class PosformPosComponent implements OnInit {
  @Input() idPOS!: number;

  dataItem!: IPos;

  constructor(private posVenteService: PosVenteService) {}

  ngOnInit(): void {
    this.posVenteService.get(this.idPOS).subscribe(res => {
      this.dataItem = res.data;
    });
  }

}