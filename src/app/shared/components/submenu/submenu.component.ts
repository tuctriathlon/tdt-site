import { Component, Input, OnChanges } from '@angular/core'
import { Router } from '@angular/router'
import { Page } from 'src/app/shared/models/page.model'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnChanges {
    @Input() menuItems: Partial<Page>[] = []
    public subPages: Partial<Page>[] = []

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnChanges() {
        if (this.menuItems?.length) {
            this.subPages = this.menuItems
        } else {
            this.loadSubPages()
        }
    }

    private loadSubPages() {
        const url = this.router.url.replace('/', '')
        if (url) {
            this.dataService.getPages().subscribe((pages) => {
                const currentPage = pages.find(
                    (page) => page.url === url && page.parent_page_id !== null
                )
                if (currentPage && currentPage.parent_page_id) {
                    this.subPages = pages.filter(
                        (page) => page.parent_page_id === currentPage.parent_page_id
                    )
                }
            })
        }
    }
}
