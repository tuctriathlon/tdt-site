import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model'
import { Page } from 'src/app/shared/models/page.model'
import { Partner } from 'src/app/shared/models/partner.model'
import { Race } from 'src/app/shared/models/race.model'
import { Content } from 'src/app/shared/models/content.model'
import { SiteConfig } from 'src/app/shared/models/site-config.model'



@Injectable()
export class DataService {

  PREFIX = "http://admin.triathlondetoulouse.com/tdt";

  config: BehaviorSubject<SiteConfig> = new BehaviorSubject<SiteConfig>(null);
  pages = new BehaviorSubject<Page[]>([]);
  medias = new BehaviorSubject([]);
  partners = new BehaviorSubject<Partner[]>([]);
  results = new BehaviorSubject([]);
  inscriptions = new BehaviorSubject([]);
  races: BehaviorSubject<Race[]> = new BehaviorSubject<Race[]>([]);
  home = new BehaviorSubject([]);
  contents: BehaviorSubject<Content[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getData<Content>(`/items/information_content?sort=ordre_affichage`)
      .subscribe(contents => this.contents.next(contents));

    this.getData<Page>(`/items/pages_collection?fields=*&sort=ordre_affichage`)
      .subscribe(pages => this.pages.next(pages));

    this.getData<Partner>(`/items/partenaires?fields=*.*&sort=ordre_affichage`)
      .subscribe(partners => this.partners.next(partners));

    this.getData(`/items/medias?fields=*.*&sort=-annee`)
      .subscribe(medias => this.medias.next(medias));

    this.getData(`/items/resultats?fields=*.*&sort=-annee`)
      .subscribe(results => this.results.next(results));

    this.getData(`/items/inscription_etape?fields=*.*&sort=ordre_affichage`)
      .subscribe(inscriptions => this.inscriptions.next(inscriptions));

    this.getData<Race>(`/items/courses?fields=*.*.*&sort=date`)
      .pipe(map(races => {
        return races.map(race => {
          race.name = race.type_de_course + ' ' + race.format;
          race.name = race.specificite ? race.name + ' ' + race.specificite : race.name;
          race.slug = race.name.replace(' ', '-').toLowerCase();
          const date =  moment(race.date, "YYYY-MM-DD HH:mm:ss");
          race.day = date.locale('fr').format('dddd');
          race.time = date.format('HH:mm');
          race.etapes.forEach(etape => {
            etape.computedDistance = etape.affichage_distance === 'm' ? etape.distance.toString() : (etape.distance / 1000).toString();
            etape.computedDistance += ' ' + etape.affichage_distance;
          });
          if (race.age) {
            race.yearLimit = +date.format('YYYY') - race.age;
          }
          return race;
        });
      }))
      .subscribe(races => this.races.next(races));

    this.getData<Article>(`/items/home_page?fields=*.*&sort=-created_on`)
      .pipe(map(articles => {
        articles.forEach(article => {
          const date = moment(article.created_on, "YYYY-MM-DD HH:mm:ss");
          article.date = date.locale('fr').format('DD MMMM YYYY');
        })
        return articles;
      }))
      .subscribe(home => this.home.next(home));
  }

  loadConfig() {
      return this.getData<SiteConfig>(`/items/general_information?limit=1`)
          .pipe(map(configs => this.config.next(configs[0])));
  }
  getGlobalConfig() {
    return this.config;
  }

  getHome() {
    return this.home;
  }

  getPartners() {
    return this.partners;
  }

  getResults() {
    return this.results;
  }

  getMedias() {
    return this.medias;
  }

  getPages() {
    return this.pages;
  }

  getContent(pageId: number) {
    return this.contents
      .pipe(map(contents => contents.filter(content => content.page_id === pageId)));
  }

  getInscriptionSteps() {
    return this.inscriptions;
  }

  getRaces() {
    return this.races;
  }

  private getData<T>(url): Observable<T[]> {
    return this.http.get<{ data: T[], public: boolean }>(`${this.PREFIX}${url}`)
      .pipe(
          map(res => res.data),
      )
  }
}

