import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { SiteConfig } from 'src/app/shared/models/site-config.model'
import { DataService } from '../../services/data.service';

@Component({
  selector: 'tdt-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  public config$: BehaviorSubject<SiteConfig>;
  public partners$;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.config$ = this.dataService.getGlobalConfig();
    this.partners$ = this.dataService.getPartners();
  }
}
