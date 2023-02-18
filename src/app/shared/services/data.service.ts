import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Content } from '../models/models';
import * as moment from 'moment';


@Injectable()
export class DataService {

  PREFIX = "http://admin.triathlondetoulouse.com/tdt";

  config = new BehaviorSubject({});
  pages = new BehaviorSubject([]);
  medias = new BehaviorSubject([]);
  partners = new BehaviorSubject([]);
  results = new BehaviorSubject([]);
  inscriptions = new BehaviorSubject([]);
  races = new BehaviorSubject([]);
  home = new BehaviorSubject([]);
  contents: BehaviorSubject<Array<Content>> = new BehaviorSubject([]);

  constructor(private http: Http) {
    this.getData(`/items/information_content?sort=ordre_affichage`)
      .subscribe(contents => this.contents.next(contents));

    this.getData(`/items/general_information?limit=1`)
      .pipe(map(configs => configs[0]))
      .subscribe(config => this.config.next(config));

    this.getData(`/items/pages_collection?fields=*&sort=ordre_affichage`)
      .subscribe(pages => this.pages.next(pages));

    this.getData(`/items/partenaires?fields=*.*&sort=ordre_affichage`)
      .subscribe(partners => this.partners.next(partners));
    
    this.getData(`/items/medias?fields=*.*&sort=-annee`)
      .subscribe(medias => this.medias.next(medias));
    
    this.getData(`/items/resultats?fields=*.*&sort=-annee`)
      .subscribe(results => this.results.next(results));
    
    this.getData(`/items/inscription_etape?fields=*.*&sort=ordre_affichage`)
      .subscribe(inscriptions => this.inscriptions.next(inscriptions));
    
    this.getData(`/items/courses?fields=*.*.*&sort=date`)
      .pipe(map(medias => {
        return medias.map(race => {        
          race.name = race.type_de_course + ' ' + race.format;
          race.name = race.specificite ? race.name + ' ' + race.specificite : race.name;
          race.slug = race.name.replace(' ', '-').toLowerCase();
          const date =  moment(race.date, "YYYY-MM-DD HH:mm:ss");
          race.day = date.locale('fr').format('dddd');
          race.time = date.format('HH:mm');
          race.etapes.forEach(etape => {
            etape.distance = etape.affichage_distance === 'm' ? etape.distance : etape.distance / 1000;
            etape.distance += ' ' + etape.affichage_distance;
          });
          if (race.age) {
            race.yearLimit = +date.format('YYYY') - race.age;
          }
          return race;
        });
      }))
      .subscribe(races => this.races.next(races));
    
    this.getData(`/items/home_page?fields=*.*&sort=-created_on`)
      .pipe(map(articles => {
        articles.forEach(article => {
          const date = moment(article.created_on, "YYYY-MM-DD HH:mm:ss");
          article.date = date.locale('fr').format('DD MMMM YYYY');
        })
        return articles;
      }))
      .subscribe(home => this.home.next(home));
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

  getContent(pageId: String) {
    return this.contents
      .pipe(map(contents => contents.filter(content => content.page_id === pageId)));
  }

  getInscriptionSteps() {
    return this.inscriptions;
  }

  getRaces() {
    return this.races;
  }

  private getData(url) {
    return this.http.get(`${this.PREFIX}${url}`)
      .pipe(map(response => this.extractData(response)))
  }

  private extractData(res: Response) {
    return res.json().data || {};
  }
}

