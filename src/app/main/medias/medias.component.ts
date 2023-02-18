import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tdt-medias-page',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})
export class MediasComponent implements OnInit {

  public medias$;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.medias$ = this.dataService.getMedias()
      .pipe(map((medias: any) => medias.map(media => {
        media.elements = media.medias_details.reduce((elements, detail) => {
          if (detail.media_type === 'photo') {
            let element = elements.find(item => item.type === detail.media_type);
            if (!element) {
              element = {
                name : 'Photos',
                type : detail.media_type,
                pictures : [],
                order: detail.ordre_affichage
              };
              elements.push(element);                
            }
            element.pictures.push({
              name: detail.title,
              url: detail.url
            })
          } else { // video
            elements.push({
              name : detail.title,
              type : detail.media_type,
              url : detail.url,
              order: detail.ordre_affichage
            });     
          }
          return elements;
        }, [])
        .sort((a, b) => a.order - b.order);
        media.selected = media.elements[0];
        return media;
      })));
  }
}
