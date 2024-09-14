import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableViewModel } from '../../models/nd-dashboard.models';

@Component({
  selector: 'app-nd-table-view',
  templateUrl: './nd-table-view.component.html',
  styleUrl: './nd-table-view.component.scss'
})
export class NdTableViewComponent { 
  @Input() tableView: TableViewModel[] = [];
  @Input() isLoading!: boolean;

 

}
