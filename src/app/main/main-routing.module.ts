import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericComponent } from './generic/generic.component';
import { MainComponent } from './main.component';
import { MediasComponent } from './medias/medias.component';
import { RacesComponent } from './races/races.component';
import { RacesOverviewComponent } from './races/overview/races-overview.component';
import { RacesSingleComponent } from './races/single/races-single.component';
import { ResultsComponent } from './results/results.component';
import { PartnersComponent } from './partners/partners.component';
import { InscriptionComponent } from './inscription/inscription.component';

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
        redirectTo: 'courses/programme'
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