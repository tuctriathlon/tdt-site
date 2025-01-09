import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component( {
    selector: 'main-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports: [
        RouterOutlet,
    ],
})
export class MainComponent {
    title = 'app works!'
}
