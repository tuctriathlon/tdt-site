import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GenericComponent } from './generic/generic.component';
import { MediasComponent } from './medias/medias.component';
import { RacesComponent } from './races/races.component';
import { RacesSingleComponent } from './races/single/races-single.component';
import { RacesOverviewComponent } from './races/overview/races-overview.component';
import { ResultsComponent } from './results/results.component';
import { PartnersComponent } from './partners/partners.component';
import { InscriptionComponent } from './inscription/inscription.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        MainRoutingModule
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
})
export class MainModule {
}
