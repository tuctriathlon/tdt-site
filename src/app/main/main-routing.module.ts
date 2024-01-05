import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GenericComponent } from './generic/generic.component'
import { InscriptionComponent } from './inscription/inscription.component'
import { MainComponent } from './main.component'
import { MediasComponent } from './medias/medias.component'
import { PartnersComponent } from './partners/partners.component'
import { RacesOverviewComponent } from './races/overview/races-overview.component'
import { RacesComponent } from './races/races.component'
import { RacesSingleComponent } from './races/single/races-single.component'
import { ResultsComponent } from './results/results.component'

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: GenericComponent
            },
            {
                path: 'inscription',
                component: InscriptionComponent
            },
            {
                path: 'courses',
                component: RacesComponent,
                children: [
                    {
                        path: 'programme',
                        component: RacesOverviewComponent
                    },
                    {
                        path: ':slug',
                        component: RacesSingleComponent
                    },
                    {
                        path: '',
                        redirectTo: 'programme'
                    }
                ]
            },
            {
                path: 'medias',
                component: MediasComponent
            },
            {
                path: 'partenaires',
                component: PartnersComponent
            },
            {
                path: 'resultats',
                component: ResultsComponent
            },
            {
                path: ':slug',
                component: GenericComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
