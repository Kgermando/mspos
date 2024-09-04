import { Component, Input, OnInit } from '@angular/core';
import { ISup } from '../../sups/models/sup.model';
import { SupService } from '../../sups/sup.service';

@Component({
  selector: 'app-sup-are',
  templateUrl: './sup-are.component.html',
  styleUrl: './sup-are.component.scss'
})
export class SupAreComponent implements OnInit {
  @Input() id!: number;

  sup!: ISup;

  constructor(private supService: SupService) {}


  ngOnInit(): void {
    this.supService.get(this.id).subscribe(res => {
      this.sup = res.data;
    })
  }


  
}
