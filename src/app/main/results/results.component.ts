import { Component, OnInit } from '@angular/core'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-results-page',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
    public results$

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.results$ = this.dataService.getResults()
    }
}
