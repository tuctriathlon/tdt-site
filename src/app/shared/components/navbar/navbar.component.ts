import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common'
import { Component, HostListener, signal } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router'
import { map } from 'rxjs/operators'
import { ThumbnailNames } from 'src/app/shared/models/file.model'

import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [AsyncPipe, RouterLink, NgOptimizedImage, RouterLinkActive, NgIf],
})
export class NavbarComponent {
    public expandable = false
    public expanded = true
    public open = false
    activeSubmenu = signal('')

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

    get logoUrl$() {
        return this.config$.pipe(
            map((config) =>
                DataService.getThumbnailUrl(config.logo_tdt, ThumbnailNames.LARGE_CONTAIN)
            )
        )
    }

    get day$() {
        return this.config$.pipe(map((config) => config.date.match(/\d{1,2}\s&\s\d{1,2}/)[0]))
    }
    get month$() {
        return this.config$.pipe(map((config) => config.date.toUpperCase().match(/\w{3,}/)[0]))
    }
    get year$() {
        return this.config$.pipe(map((config) => config.date.match(/\d{4}/)[0]))
    }
    get pages$() {
        return this.dataService
            .getPages() //
            .pipe(map((pages) => pages.filter((page) => page.parent_page_id === null)))
    }

    get config$() {
        return this.dataService.getGlobalConfig()
    }

    toggleSubmenu(submenu: string) {
        this.activeSubmenu.set(this.activeSubmenu() === submenu ? '' : submenu)
    }

    getSubpages(pageId: number) {
        return this.dataService
            .getPages()
            .pipe(map((pages) => pages.filter((page) => page.parent_page_id === pageId)))
    }
}
