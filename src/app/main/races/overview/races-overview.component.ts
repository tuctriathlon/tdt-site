import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.races$ = this.dataService.getRaces()
    .pipe(map(races => {
      return races.reduce((days, race: Race) => {
        if (!days.find(day => day.day === race.day)) {
          days.push({day : race.day, races: []});
        }
        days.find(day => day.day === race.day).races.push(race);
        return days;
      }, []);
    }))
  }
}
