import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { share } from 'rxjs'
import { Race } from 'src/app/shared/models/race.model'

import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-races-overview-page',
    templateUrl: './races-overview.component.html',
    styleUrls: ['./races-overview.component.scss']
})
export class RacesOverviewComponent implements OnInit {

    public races$;

    constructor(private dataService: DataService,
                private datePipe: DatePipe) { }

    ngOnInit() {
        this.races$ = this.dataService.getRaces()
            .pipe(map(races => {
                return races.reduce((days, race: Race) => {
                    const raceDay = this.datePipe.transform(race.date, 'EEEE')
                    if (!days.find(day => day.day === raceDay)) {
                        days.push({day : raceDay, races: []});
                    }
                    days.find(day => day.day === raceDay).races.push(race);
                    return days;
                }, []);
            }))
    }
}
