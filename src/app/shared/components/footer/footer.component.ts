import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { Partner } from 'src/app/shared/models/partner.model'
import { SiteConfig } from 'src/app/shared/models/site-config.model'
import { DataService } from '../../services/data.service';

@Component({
  selector: 'tdt-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  public config$: BehaviorSubject<SiteConfig>;
  public partners$: Observable<Partner[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.config$ = this.dataService.getGlobalConfig();
    this.partners$ = this.dataService.getPartners();
  }
}
