import { Component, HostListener, OnInit } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs'
import { SiteConfig } from 'src/app/shared/models/models'
import { DataService } from '../../services/data.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'tdt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public config$: BehaviorSubject<SiteConfig>;
  public pages$;
  public expandable = false;
  public expanded = true;
  public open = false;

  constructor(router: Router,
              private dataService: DataService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.expandable = val.url === '/';
        this.updateExpanded();
      }
    });
  }

  @HostListener("window:scroll", [])
  updateExpanded() {
    this.expanded = window.scrollY < 150 && this.expandable;
  }

  ngOnInit() {
    this.config$ = this.dataService.getGlobalConfig();
    this.pages$ = this.dataService.getPages() //
      .pipe(map(pages => pages.filter(page => page.parent_page_id === null)));
  }
}
