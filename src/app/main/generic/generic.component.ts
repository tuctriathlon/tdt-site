import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { Content } from 'src/app/shared/models/content.model'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
  selector: 'tdt-generic-page',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {

  public subPages = [];
  public articles$: Observable<Content[]>;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        const url = params['slug'];
        if (url) {
          this.dataService.getPages()
            .subscribe(pages => {
              const currentPage = pages.find(page => page.url === url && page.parent_page_id !== null);
              if (currentPage) {
                if (currentPage.parent_page_id) {
                  this.subPages = pages.filter(page => page.parent_page_id === currentPage.parent_page_id);
                }
                this.articles$ = this.dataService.getContent(currentPage.id);
              }
            });
        } else {
          this.articles$ = this.dataService.getHome();
        }
      });
  }
}
