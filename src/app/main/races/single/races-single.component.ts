import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tdt-races-single-page',
  templateUrl: './races-single.component.html',
  styleUrls: ['./races-single.component.scss']
})
export class RacesSingleComponent implements OnInit {

  public race;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        const slug = params['slug'];
        this.dataService.getRaces()
          .pipe(map(races => races.find(race => race.slug === slug)))
          .subscribe(race => this.race = race);
      });
  }
}

