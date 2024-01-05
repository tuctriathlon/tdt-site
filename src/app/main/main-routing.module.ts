import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from 'src/app/main/main.component'

import { GenericComponent } from 'src/app/main/generic/generic.component'
import { InscriptionComponent } from 'src/app/main/inscription/inscription.component'

import { MediasComponent } from 'src/app/main/medias/medias.component'
import { PartnersComponent } from 'src/app/main/partners/partners.component'
import { RacesOverviewComponent } from 'src/app/main/races/overview/races-overview.component'
import { RacesComponent } from 'src/app/main/races/races.component'
import { RacesSingleComponent } from 'src/app/main/races/single/races-single.component'
import { ResultsComponent } from 'src/app/main/results/results.component'

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: GenericComponent,
            },
            {
                path: 'inscription',
                component: InscriptionComponent,
            },
            {
                path: 'courses',
                component: RacesComponent,
                children: [
                    {
                        path: 'programme',
                        component: RacesOverviewComponent,
                    },
                    {
                        path: ':slug',
                        component: RacesSingleComponent,
                    },
                    {
                        path: '',
                        redirectTo: 'programme',
                    },
                ],
            },
            {
                path: 'medias',
                component: MediasComponent,
            },
            {
                path: 'partenaires',
                component: PartnersComponent,
            },
            {
                path: 'resultats',
                component: ResultsComponent,
            },
            {
                path: ':slug',
                component: GenericComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/',
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {}
