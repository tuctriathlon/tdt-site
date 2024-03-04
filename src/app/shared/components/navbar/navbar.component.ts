import { Component, HostListener, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { map } from 'rxjs/operators'
import { ThumbnailNames } from 'src/app/shared/models/file.model'
import { SiteConfig } from 'src/app/shared/models/site-config.model'

import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    public config$: BehaviorSubject<SiteConfig>
    public pages$
    public logoUrl$: Observable<string>
    public expandable = false
    public expanded = true
    public open = false

    constructor(
        router: Router,
        private dataService: DataService
    ) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.expandable = val.url === '/'
                this.updateExpanded()
            }
        })
    }

    @HostListener('window:scroll', [])
    updateExpanded() {
        this.expanded = window.scrollY < 150 && this.expandable
    }

    ngOnInit() {
        this.config$ = this.dataService.getGlobalConfig()
        this.logoUrl$ = this.config$.pipe(
            map((config) => DataService.getThumbnailUrl(config.logo_tdt, ThumbnailNames.LARGE_CONTAIN)),
            tap((url) => console.log(url))
        )
        this.pages$ = this.dataService
            .getPages() //
            .pipe(map((pages) => pages.filter((page) => page.parent_page_id === null)))
    }
}
