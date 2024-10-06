import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();

  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }

  public sidebarDataManager = [
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
            {
              menuValue: 'Maps DR',
              route: routes.googleMapsDashboard,
            },
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
          route: routes.posFormList,
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
          base: 'provinces',
          icon: 'file-text',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'provinces', 
          route: routes.provinceList,
        },
        {
          menuValue: 'Areas',
          base: 'areas',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'areas', 
          route: routes.area,
        },
        {
          menuValue: 'POS',
          base: 'pos',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'vente',
          route: routes.posVente,
        },
      ],
    },

    {
      tittle: 'MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Users',
          icon: 'users',
          route: routes.userList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'users'
        },
        {
          menuValue: 'ASM',
          base: 'asm',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'asm',  
          route: routes.asmList,
        },
        {
          menuValue: 'Superviseurs',
          base: 'supervisors',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'superviseurs', 
          route: routes.supList,
        },
        {
          menuValue: 'Managers',
          base: 'managers',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'managers', 
          route: routes.managerList,
        },
      ],
    },
  ];

  public sidebarDataASM = [
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
              menuValue: 'Numeric distribution',
              route: routes.ndDashboard,
            }, 
            {
              menuValue: 'Out of stock',
              route: routes.oosDashboard,
            },
            {
              menuValue: 'Share of stock',
              route: routes.sosDashboard,
            }, 
            {
              menuValue: 'Maps DR',
              route: routes.googleMapsDashboard,
            },
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
          route: routes.posFormList,
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
          menuValue: 'Areas',
          base: 'areas',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.area,
        },
        {
          menuValue: 'POS',
          base: 'pos',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.posVente,
        },
      ],
    },

    {
      tittle: 'MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Users',
          icon: 'users',
          route: routes.userList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'users'
        },
        {
          menuValue: 'Superviseurs',
          base: 'supervisors',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.supList,
        },
      ],
    },
  ];

  public sidebarDataSup = [

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
          route: routes.posFormList,
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
          menuValue: 'POS',
          base: 'pos',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'vente',
          route: routes.posVente,
        },
      ],
    },

    {
      tittle: 'MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Users',
          icon: 'users',
          route: routes.userList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'users'
        },
        {
          menuValue: 'ASM',
          base: 'asm',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'asm',  
          route: routes.asmList,
        },
        {
          menuValue: 'Superviseurs',
          base: 'supervisors',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'superviseurs', 
          route: routes.supList,
        },
        {
          menuValue: 'Managers',
          base: 'managers',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'managers', 
          route: routes.managerList,
        },
        {
          menuValue: 'Activity Users',
          icon: 'bounce-right',
          base: 'users-logs',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.userLogsList,
        },
      ],
    },
  ];

  public sidebarDataDR = [
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
          route: routes.posFormList,
          base: 'posforms',
          subRoutes: [],
        },
        {
          menuValue: 'POS',
          base: 'pos',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'vente',
          route: routes.posVente,
        },
      ],
    },

  ];

  public sidebarDataSupport = [
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
            {
              menuValue: 'Maps DR',
              route: routes.googleMapsDashboard,
            },
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
          route: routes.posFormList,
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
          base: 'provinces',
          icon: 'file-text',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'provinces', 
          route: routes.provinceList,
        },
        {
          menuValue: 'Areas',
          base: 'areas',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'areas', 
          route: routes.area,
        },
        {
          menuValue: 'POS',
          base: 'pos',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'vente',
          route: routes.posVente,
        },
      ],
    },

    {
      tittle: 'MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Users',
          icon: 'users',
          route: routes.userList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'users'
        },
        {
          menuValue: 'ASM',
          base: 'asm',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'asm',  
          route: routes.asmList,
        },
        {
          menuValue: 'Superviseurs',
          base: 'supervisors',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'superviseurs', 
          route: routes.supList,
        },
        {
          menuValue: 'Managers',
          base: 'managers',
          icon: 'users',
          hasSubRoute: false,
          showSubRoute: false,
          // base1: 'managers', 
          route: routes.managerList,
        },
        {
          menuValue: 'Activity Users',
          icon: 'bounce-right',
          base: 'users-logs',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.userLogsList,
        },
      ],
    },
  ];
}
