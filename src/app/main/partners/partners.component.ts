import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { ThumbnailNames } from 'src/app/shared/models/file.model'
import { PartnerType } from 'src/app/shared/models/partner.model'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-partners-page',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    imports: [NgIf, NgForOf, NgOptimizedImage],
})
export class PartnersComponent implements OnInit {
    private partners$
    premiumPartners = []
    officialPartners = []
    supporters = []
    institutions = []
    foodTrucks = []
    fournisseurs = []
    principalPartners = []

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.partners$ = this.dataService
            .getPartners()
            .pipe(
                map((partners) =>
                    partners.map((partner) => ({
                        ...partner,
                        iconUrl: DataService.getThumbnailUrl(
                            partner.icone,
                            ThumbnailNames.THUMBNAIL
                        ),
                    }))
                )
            )
            .subscribe((partners) => {
                this.premiumPartners = partners.filter(
                    (partner) => partner.type === PartnerType.PREMIUM
                )
                this.officialPartners = partners.filter(
                    (partner) => partner.type === PartnerType.OFFICIEL
                )
                this.supporters = partners.filter(
                    (partner) => partner.type === PartnerType.SUPPORTER
                )
                this.institutions = partners.filter(
                    (partner) => partner.type === PartnerType.INSTITUTION
                )
                this.foodTrucks = partners.filter(
                    (partner) => partner.type === PartnerType.FOOD_TRUCK
                )
                this.fournisseurs = partners.filter(
                    (partner) => partner.type === PartnerType.FOURNISSEUR
                )
                this.principalPartners = partners.filter(
                    (partner) => partner.type === PartnerType.PRINCIPAL
                )
            })
    }
}
