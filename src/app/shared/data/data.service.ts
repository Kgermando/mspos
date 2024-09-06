import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { routes } from '../routes/routes';
import { HttpClient } from '@angular/common/http';
import { apiResultFormat } from '../model/pages.model';

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
          base1: 'dashboard',
          subMenus: [
            {
              menuValue: 'Numeric distribution',
              route: routes.ndDashboard,
            },
            {
              menuValue: 'Weighted distribution',
              route: routes.wdDashboard,
            },
            {
              menuValue: 'Share in shop handling',
              route: routes.sishDashboard,
            },
            {
              menuValue: 'Out of stock',
              route: routes.oosDashboard,
            },
            {
              menuValue: 'Share of stck',
              route: routes.sosDashboard,
            },
            {
              menuValue: 'Sales evolution',
              route: routes.seDashboard,
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
          menuValue: 'Users manage',
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

  public getContactList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/contact-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompaniesList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/companies-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLanguageSetting(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/language-setting.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFile(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/files.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCallHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/call-history.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFileShared(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/file-shared.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeadsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/leads.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDealsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/deals.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getLanguageSettingsWeb(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/language-settings-web.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFaq(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/faq.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDataTable() {
    return this.http.get<apiResultFormat>('json/data-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTestimonials(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/testimonials.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCountries(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/countries.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStates(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/states.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCity(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/city.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSource(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/sources.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLostReason(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/lost-reason.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactStage(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/contact-stage.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getContactReports() {
    return this.http
      .get<apiResultFormat>('json/contact-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getIndustry(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/industry.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCalls(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/calls.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaskReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/task.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getMembershipTransactions(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/membership-transactions.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getManageUsers(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/manage-users.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getRolesPermissions(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/roles-permissions.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDeleteRequest(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/delete-request.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPages(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/pages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProjectLists(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/project-lists.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivitiesList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/activities-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProjectReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/project-reports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompaignList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/campaign-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompaignArchive(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/campaign-archive.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPipeline(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/pipeline.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityCalls(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/activity-calls.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityMail(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/activity-mail.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityMeeting(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/activity-meeting.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityTask(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/activity-task.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompaniesReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/companies-reports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }




  
  public gettickets(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/tickets.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactMessage(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/contact-messages.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProposalsList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/proposals-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProposalsView(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/proposal-view.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getContractList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/contract-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPaymentList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/payment-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getEstimationList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/estimation-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInvoiceList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('json/invoice-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
}
