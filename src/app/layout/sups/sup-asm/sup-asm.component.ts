import { Component, Input, OnInit } from '@angular/core';
import { AsmService } from '../../asm/asm.service';
import { IAsm } from '../../asm/models/asm.model';

@Component({
  selector: 'app-sup-asm',
  templateUrl: './sup-asm.component.html',
  styleUrl: './sup-asm.component.scss'
})
export class SupAsmComponent implements OnInit {
  @Input() asm_id!: number;

  asm!: IAsm;

  constructor(private asmService: AsmService) {}


  ngOnInit(): void {
    this.asmService.get(this.asm_id).subscribe(res => {
      this.asm = res.data;
    })
  }

   
}
