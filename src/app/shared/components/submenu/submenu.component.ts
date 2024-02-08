import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {
    public subPages = []

    constructor(
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit() {
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
