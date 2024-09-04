import { Component, Input, OnInit } from '@angular/core';
import { SupService } from '../../sups/sup.service';
import { ISup } from '../../sups/models/sup.model';

@Component({
  selector: 'app-sup-count',
  templateUrl: './sup-count.component.html',
  styleUrl: './sup-count.component.scss'
})
export class SupCountComponent implements OnInit {
  @Input() id!: number;

  supList: ISup[] = [];
  totalSup = 0;

  constructor(
    private supServce: SupService,
  ) {
  }


  ngOnInit(): void {
    this.supServce.getAllById(this.id).subscribe(res => {
      this.supList = res.data;
      this.totalSup = this.supList.length
    })
  }
}
