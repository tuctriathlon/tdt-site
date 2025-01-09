import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable } from 'rxjs'
import { SubmenuComponent } from 'src/app/shared/components/submenu/submenu.component'
import { Content } from 'src/app/shared/models/content.model'
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe'
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe'
import { DataService } from 'src/app/shared/services/data.service'

@Component( {
    selector: 'tdt-generic-page',
    templateUrl: './generic.component.html',
    styleUrls: ['./generic.component.scss'],
    imports: [
        CommonModule,
        SubmenuComponent,
        SafeHtmlPipe,
        SafeUrlPipe,
    ],
})
export class GenericComponent implements OnInit {
    public subPages = []
    public articles$: Observable<Content[]>

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService
    ) {}

    ngOnInit() {
        combineLatest([this.route.params, this.route.data]).subscribe(([params, data]) => {
            const url = params['slug'] || data['slug']
            if (url) {
                this.dataService.getPages().subscribe((pages) => {
                    const currentPage = pages.find(
                        (page) => page.url === url && page.parent_page_id !== null
                    )
                    if (currentPage) {
                        if (currentPage.parent_page_id) {
                            this.subPages = pages.filter(
                                (page) => page.parent_page_id === currentPage.parent_page_id
                            )
                        }
                        this.articles$ = this.dataService.getContent(currentPage.id)
                    }
                })
            } else {
                this.articles$ = this.dataService.getHome()
            }
        })
    }
}
