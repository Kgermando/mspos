import { Component, Input, OnInit } from '@angular/core';
import { SupService } from '../../sups/sup.service';
import { ISup } from '../../sups/models/sup.model';

@Component({
  selector: 'app-posform-sup',
  templateUrl: './posform-sup.component.html',
  styleUrl: './posform-sup.component.scss'
})
export class PosformSupComponent implements OnInit {
  @Input() idSup!: number;

  dataItem!: ISup;

  constructor(private supService: SupService) {}

  ngOnInit(): void {
    this.supService.get(this.idSup).subscribe(res => {
      this.dataItem = res.data;
    });
  }

}

