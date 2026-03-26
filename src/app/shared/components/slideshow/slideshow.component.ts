import { NgForOf } from '@angular/common'
import { Component } from '@angular/core'

@Component({
    selector: 'tdt-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.scss'],
    imports: [NgForOf],
})
export class SlideshowComponent {
    public slideshow = [
        'https://www.triathlondetoulouse.com/assets/uploads/originals/e0aa16b0-0fcf-464d-84e2-91ac4b3fd199.png',
    ]
    public idx = 1

    constructor() {
        this.idx = this.getRandomIndex(this.slideshow.length - 1)
    }

    nextPicture() {
        this.idx = (this.idx + 1) % this.slideshow.length
    }

    private getRandomIndex(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }
}
