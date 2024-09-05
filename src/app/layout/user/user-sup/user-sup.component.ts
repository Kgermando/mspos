import { Component, Input, OnInit } from '@angular/core';
import { ISup } from '../../sups/models/sup.model';
import { SupService } from '../../sups/sup.service';

@Component({
  selector: 'app-user-sup',
  templateUrl: './user-sup.component.html',
  styleUrl: './user-sup.component.scss'
})
export class UserSupComponent implements OnInit {
  @Input() id!: number;
 
  sup!: ISup;
 
  constructor(private supService: SupService) {}
 
   ngOnInit(): void {
     this.supService.get(this.id).subscribe(res => {
       this.sup = res.data;
     })
   }
 
 }
