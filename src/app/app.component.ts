import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataService } from 'src/app/shared/services/data.service'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    home = false

    constructor(
        private dataService: DataService,
        private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((_event) => {
            this.home = this.router.url == '/'
        })
        this.dataService.metaData.subscribe((metaData) => {
            metaData.forEach((meta) => {
                let item = document.querySelector(`meta[name="${meta.name}"]`)
                if (!item) {
                    item = document.createElement("meta")
                    document.head.appendChild(item)
                }
                item.setAttribute("content", meta.content)
            })
        })
    }
}
