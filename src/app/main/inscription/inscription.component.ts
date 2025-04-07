import { AsyncPipe, NgForOf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { SubmenuComponent } from 'src/app/shared/components/submenu/submenu.component'
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe'
import { DataService } from 'src/app/shared/services/data.service'

@Component({
    selector: 'tdt-inscription-page',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.scss'],
    imports: [AsyncPipe, NgForOf, SubmenuComponent, SafeHtmlPipe],
})
export class InscriptionComponent implements OnInit {
    public steps$

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.steps$ = this.dataService.getInscriptionSteps()
    }
}
