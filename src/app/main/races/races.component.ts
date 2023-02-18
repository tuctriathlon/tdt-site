import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'tdt-races-page',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {

  public races$;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.races$ = this.dataService.getRaces();
  }
}
