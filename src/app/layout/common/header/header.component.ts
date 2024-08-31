import { Component } from '@angular/core';
import { SidebarService } from '../../../shared/sidebar/sidebar.service';
import { CommonService } from '../../../shared/common/common.service';
import { routes } from '../../../shared/routes/routes';
import { SettingsService } from '../../../shared/settings/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  base = '';
  page = '';
  last = '';
  themeMode = 'light_mode';
  public miniSidebar = false;
  public routes = routes;
  constructor(
    private common: CommonService,
    private sidebar: SidebarService,
    private settings: SettingsService
  ) {
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    this.sidebar.sideBarPosition.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.settings.themeMode.subscribe((res: string) => {
      this.themeMode = res;
    });
    
  }
  

  public toggleSidebar(): void {
    this.sidebar.switchSideMenuPosition();
  }

  public togglesMobileSideBar(): void {
    this.sidebar.switchMobileSideBarPosition();
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }
   public changeThemeMode(theme: string): void {
     this.settings.themeMode.next(theme);
     localStorage.setItem('themeMode', theme);
   }
  
}
