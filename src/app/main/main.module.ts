import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { SharedModule } from 'src/app/shared/shared.module'
import { GenericComponent } from 'src/app/main/generic/generic.component'
import { InscriptionComponent } from 'src/app/main/inscription/inscription.component'

import { MainRoutingModule } from 'src/app/main/main-routing.module'
import { MainComponent } from 'src/app/main/main.component'
import { MediasComponent } from 'src/app/main/medias/medias.component'
import { PartnersComponent } from 'src/app/main/partners/partners.component'
import { RacesOverviewComponent } from 'src/app/main/races/overview/races-overview.component'
import { RacesComponent } from 'src/app/main/races/races.component'
import { RacesSingleComponent } from 'src/app/main/races/single/races-single.component'
import { ResultsComponent } from 'src/app/main/results/results.component'

@NgModule({
    imports: [CommonModule, SharedModule, FormsModule, MainRoutingModule, NgOptimizedImage],
    declarations: [
        MainComponent,
        GenericComponent,
        MediasComponent,
        RacesComponent,
        RacesOverviewComponent,
        RacesSingleComponent,
        ResultsComponent,
        PartnersComponent,
        InscriptionComponent,
    ],
    providers: [DatePipe],
})
export class MainModule {}
