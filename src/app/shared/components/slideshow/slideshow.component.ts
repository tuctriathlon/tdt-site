import { Component } from '@angular/core';

@Component({
  selector: 'tdt-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent {

  public slideshow = ["/assets/pictures/slideshow_tdt_1.jpg", 
                      "/assets/pictures/slideshow_tdt_2.jpg",
                      "/assets/pictures/slideshow_tdt_3.jpg"];  
  public idx = 1;

  constructor() {
    this.idx = this.getRandomIndex(this.slideshow.length - 1);
  }

  nextPicture() {
    this.idx = (this.idx +1) % this.slideshow.length;;
  }

  private getRandomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
