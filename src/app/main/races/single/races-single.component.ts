import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable, share } from 'rxjs'
import { map } from 'rxjs/operators'
import { Race } from 'src/app/shared/models/race.model'
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-races-single-page',
    templateUrl: './races-single.component.html',
    styleUrls: ['./races-single.component.scss'],
    imports: [NgIf, AsyncPipe, DatePipe, SafeHtmlPipe, NgForOf],
})
export class RacesSingleComponent {
    public race$: Observable<Race>

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute
    ) {
        this.race$ = combineLatest([this.route.params, this.dataService.getRaces()]).pipe(
            map(([params, races]) => {
                const slug = params['slug']
                return races.find((race) => race.slug === slug)
            }),
            share()
        )
    }
}
