import { Component, OnInit } from '@angular/core'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-inscription-page',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
    public steps$

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.steps$ = this.dataService.getInscriptionSteps()
    }
}
