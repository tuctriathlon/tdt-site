import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module'
import { GenericComponent } from './generic/generic.component'
import { InscriptionComponent } from './inscription/inscription.component'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { MediasComponent } from './medias/medias.component'
import { PartnersComponent } from './partners/partners.component'
import { RacesOverviewComponent } from './races/overview/races-overview.component'
import { RacesComponent } from './races/races.component'
import { RacesSingleComponent } from './races/single/races-single.component'
import { ResultsComponent } from './results/results.component'

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        MainRoutingModule,
        NgOptimizedImage,
    ],
    declarations: [
        MainComponent,
        GenericComponent,
        MediasComponent,
        RacesComponent,
        RacesOverviewComponent,
        RacesSingleComponent,
        ResultsComponent,
        PartnersComponent,
        InscriptionComponent
    ],
    providers: [
        DatePipe
    ]
})
export class MainModule {
}
