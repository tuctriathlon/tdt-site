import { Routes } from '@angular/router'

import { GenericComponent } from 'src/app/main/generic/generic.component'
import { InscriptionComponent } from 'src/app/main/inscription/inscription.component'
import { MainComponent } from 'src/app/main/main.component'

import { MediasComponent } from 'src/app/main/medias/medias.component'
import { PartnersComponent } from 'src/app/main/partners/partners.component'
import { RacesOverviewComponent } from 'src/app/main/races/overview/races-overview.component'
import { RacesComponent } from 'src/app/main/races/races.component'
import { RacesSingleComponent } from 'src/app/main/races/single/races-single.component'
import { ResultsComponent } from 'src/app/main/results/results.component'

export const routes: Routes = [
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
                        path: 'challenge-entreprise',
                        component: GenericComponent,
                        data: { slug: 'courses/challenge-entreprise' },
                    },
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
                        pathMatch: 'full',
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
