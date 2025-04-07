import { Component, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { FooterComponent } from 'src/app/shared/components/footer/footer.component'
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component'
import { SlideshowComponent } from 'src/app/shared/components/slideshow/slideshow.component'
import { DataService } from 'src/app/shared/services/data.service'
@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        NavbarComponent,
        SlideshowComponent,
        RouterOutlet,
        FooterComponent,
    ],
})
export class AppComponent implements OnInit {
    home = false

    constructor(
        private dataService: DataService,
        private router: Router
    ) {}

    ngOnInit() {
        this.router.events.subscribe((_event) => {
            this.home = this.router.url == '/'
        })
        this.dataService.metaData.subscribe((metaData) => {
            metaData.forEach((meta) => {
                let item = document.querySelector(`meta[name="${meta.name}"]`)
                if (!item) {
                    item = document.createElement('meta')
                    document.head.appendChild(item)
                }
                item.setAttribute('content', meta.content)
            })
        })
    }
}
