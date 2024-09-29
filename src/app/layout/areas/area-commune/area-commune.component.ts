import { Component, Input, OnInit } from '@angular/core';  

@Component({
  selector: 'app-area-commune',
  templateUrl: './area-commune.component.html',
  styleUrl: './area-commune.component.scss'
})
export class AreaCommuneComponent implements OnInit {

  @Input() commune!: string;

  
  dataList: string[] = [];
  
  ngOnInit(): void {
    const data =  this.commune.slice(1, -1); 
    this.dataList = data.split(', '); 
  }
 
}
