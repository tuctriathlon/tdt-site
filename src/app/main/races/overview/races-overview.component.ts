import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Observable } from 'rxjs'

import { map } from 'rxjs/operators'
import { DayRace, Race } from 'src/app/shared/models/race.model'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-races-overview-page',
    templateUrl: './races-overview.component.html',
    styleUrls: ['./races-overview.component.scss'],
    imports: [AsyncPipe, NgForOf, RouterLink, NgIf, DatePipe],
})
export class RacesOverviewComponent implements OnInit {
    public races$: Observable<DayRace[]>

    constructor(
        private dataService: DataService,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.races$ = this.dataService.getRaces().pipe(
            map((races) => {
                return races.reduce((days, race: Race) => {
                    const raceDay = this.datePipe.transform(race.date, 'EEEE')
                    if (!days.find((day) => day.day === raceDay)) {
                        days.push({ day: raceDay, races: [] })
                    }
                    days.find((day) => day.day === raceDay).races.push(race)
                    return days
                }, [])
            })
        )
    }
}
