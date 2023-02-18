import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { FooterComponent } from './components/footer/footer.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

import { DataService } from '../shared/services/data.service';
import { SubmenuComponent } from './components/submenu/submenu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    FooterComponent,
    SubmenuComponent,
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    FooterComponent,
    SubmenuComponent,
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  providers: [
    DataService
  ]
})
export class SharedModule { }
