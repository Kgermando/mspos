import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { IUser } from '../../user/models/user.model';

@Component({
  selector: 'app-dr-count',
  templateUrl: './dr-count.component.html',
  styleUrl: './dr-count.component.scss'
})
export class DrCountComponent implements OnInit {
  @Input() id!: number;
 
  drList: IUser[] = []; 
  totalDR = 0;

  constructor( 
    private drServce: UserService,
  ) { 
  } 


  ngOnInit(): void {
    this.drServce.getAllById(this.id).subscribe(res => {
    this.drList = res.data;
    this.totalDR = this.drList.length
  })
  }
}