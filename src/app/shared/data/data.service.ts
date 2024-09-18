import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { routes } from '../routes/routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();

  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }

  public sidebarData1 = [
    {
      tittle: 'Main MENU',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      menu: [
        {
          menuValue: 'Dashboard', 
          hasSubRoute: true,
          showSubRoute: true,
          icon: 'layout-2',
          base: 'dashboard',
          subMenus: [
            {
              menuValue: 'Summary',
              route: routes.msposDashboard,
            },
            {
              menuValue: 'Numeric distribution',
              route: routes.ndDashboard,
            },
            // {
            //   menuValue: 'Weighted distribution',
            //   route: routes.wdDashboard,
            // },
            // {
            //   menuValue: 'Share in shop handling',
            //   route: routes.sishDashboard,
            // },
            {
              menuValue: 'Out of stock',
              route: routes.oosDashboard,
            },
            {
              menuValue: 'Share of stock',
              route: routes.sosDashboard,
            },
            // {
            //   menuValue: 'Sales evolution',
            //   route: routes.seDashboard,
            // },
          ]
        }, 
      ],
    },
    {
      tittle: 'POS',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'Posforms',
          icon: 'list-check',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.posForm,
          base: 'posforms',
          subRoutes: [],
        }, 
        
      ],
    },
    {
      tittle: 'REPORTING',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'Provinces',
          base: 'expense',
          icon: 'file-text',
          hasSubRoute: false,
          showSubRoute: false,
          base1: 'provinces', 
          route: routes.provinceList,
        },
        {
          menuValue: 'Areas',
          base: 'expense',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          base1: 'ares', 
          route: routes.area,
        },
        {
          menuValue: 'POS',
          base: 'expense',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          base1: 'vente',
          route: routes.posVente, 
        }, 
      ],
    }, 

    {
      tittle: 'USERS MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Users',
          icon: 'users',
          route: routes.userList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'manage-users'
        },
        {
          menuValue: 'ASM',
          base: 'expense',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          base1: 'asm',  
          route: routes.asmList,
        },
        {
          menuValue: 'Superviseurs',
          base: 'expense',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          base1: 'superviseurs', 
          route: routes.supList,
        },
        {
          menuValue: 'Managers',
          base: 'expense',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          base1: 'managers', 
          route: routes.managerList,
        },
        {
          menuValue: 'Activity Users',
          icon: 'bounce-right',
          route: routes.userLogsList,
          hasSubRoute: false,
          showSubRoute: false,
          base: routes.userLogsList,
        },
      ],
    },
  
    
  ];

 
}
