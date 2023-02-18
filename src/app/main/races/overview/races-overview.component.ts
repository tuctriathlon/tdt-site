import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Race } from '../../../shared/models/models';
import { map } from 'rxjs/operators';

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
