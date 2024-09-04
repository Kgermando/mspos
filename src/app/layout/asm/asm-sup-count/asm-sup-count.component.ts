import { Component, Input, OnInit } from '@angular/core';
import { SupService } from '../../sups/sup.service';
import { ISup } from '../../sups/models/sup.model';

@Component({
  selector: 'app-asm-sup-count',
  templateUrl: './asm-sup-count.component.html',
  styleUrl: './asm-sup-count.component.scss'
})
export class AsmSupCountComponent implements OnInit {
  @Input() id!: number;

  supList: ISup[] = []; 
  totalSup = 0; 

  constructor( 
    private supService: SupService,
  ) { 
  }

  ngOnInit(): void {
    this.supService.GetSupASMByID(this.id).subscribe(res => {
      this.supList = res.data;
      this.totalSup = this.supList.length
    })
  }

}
