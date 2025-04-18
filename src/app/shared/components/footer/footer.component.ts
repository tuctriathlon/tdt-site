import { AsyncPipe, NgForOf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ThumbnailNames } from 'src/app/shared/models/file.model'
import { Partner } from 'src/app/shared/models/partner.model'
import { SiteConfig } from 'src/app/shared/models/site-config.model'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [AsyncPipe, NgForOf],
})
export class FooterComponent implements OnInit {
    public config$: BehaviorSubject<SiteConfig>
    public partners$: Observable<Partner[]>

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.config$ = this.dataService.getGlobalConfig()
        this.partners$ = this.dataService.getPartners().pipe(
            map((partners) =>
                partners.map((partner) => ({
                    ...partner,
                    iconUrl: DataService.getThumbnailUrl(
                        partner.icone,
                        ThumbnailNames.SMALL_CONTAIN
                    ),
                }))
            )
        )
    }
}
