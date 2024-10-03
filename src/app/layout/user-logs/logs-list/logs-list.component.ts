import { Component, OnInit, ViewChild } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { UserLogsModel } from '../models/user-logs.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LogsService } from '../logs.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../auth/models/user.model';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.scss'
})
export class LogsListComponent implements OnInit {
  isLoadingData = false;
  public routes = routes;

  currentUser!: UserModel;

  // Table 
  dataList: UserLogsModel[] = [];
  totalItems: number = 0;
  pageSize: number = 15;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  displayedColumns: string[] = ['created', 'fullname', 'title', 'name', 'action', 'description'];
  dataSource = new MatTableDataSource<UserLogsModel>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
    private router: Router, 
    private authService: AuthService,
    private logsService: LogsService, 
  ) { 
  }

  selectedValue1: any[] | undefined;
  selectedValue2: any[] | undefined;
  selectedValue3: any[] | undefined;
  selectedValue4: any[] | undefined;

  selectedDatas1: any[] | undefined;
  selectedDatas2: any[] | undefined;
  selectedDatas3: any[] | undefined;
  selectedDatas4: any[] | undefined; 


  ngAfterViewInit(): void { 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.logsService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.pageIndex, this.pageSize);
        });
        this.fetchProducts(this.pageIndex, this.pageSize); 
      },
      error: (error) => {
        this.isLoadingData = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.isLoadingData = true; 

    this.selectedValue1 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
    this.selectedValue2 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
    this.selectedValue3 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
    this.selectedValue4 = [
      { name: 'Choose' },
      { name: 'Contracts under Seal' },
      { name: 'Meeting' }
    ];
  }

  onPageChange(event: PageEvent): void {
    this.isLoadingData = true;
    this.fetchProducts(event.pageIndex, event.pageSize);
  }

  fetchProducts(pageIndex: number, pageSize: number) {
    this.logsService.getPaginated(pageIndex, pageSize).subscribe(res => {
      this.dataList = res.data; 
      this.totalItems = res.pagination.total_pages;
      this.length = res.pagination.length;
      this.dataSource = new MatTableDataSource<UserLogsModel>(this.dataList); 
      this.paginator.length = res.pagination.length;
      this.dataSource.sort = this.sort;  

      this.isLoadingData = false;
    });
  }

  public sortData(sort: Sort) {
    const data = this.dataList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataList = data;
    } else {
      this.dataList = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public sidebarPopup = false;
  public sidebarPopup2 = false;
  openSidebarPopup() {
    this.sidebarPopup = !this.sidebarPopup;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }  

}
