import { Component, OnInit } from '@angular/core'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-partners-page',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
    public partners$

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.partners$ = this.dataService.getPartners()
    }
}
