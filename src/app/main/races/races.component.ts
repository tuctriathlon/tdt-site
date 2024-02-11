import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Page } from 'src/app/shared/models/page.model'
import { Race } from 'src/app/shared/models/race.model'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-races-page',
    templateUrl: './races.component.html',
    styleUrls: ['./races.component.scss'],
})
export class RacesComponent implements OnInit {
    public races$: Observable<Race[]>
    public menuItems$: Observable<Page[]>

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.races$ = this.dataService.getRaces()
        this.menuItems$ = this.races$.pipe(
            map(races => {
                let pages = races.map((race, index) => {
                    return {
                        id: index,
                        page_name: race.name,
                        url: `/courses/${race.slug}`,
                    }
                })
                pages.unshift({
                    id: -1,
                    page_name: 'Programme',
                    url: '/courses/programme'
                })
                return pages
            })
        )

    }
}
