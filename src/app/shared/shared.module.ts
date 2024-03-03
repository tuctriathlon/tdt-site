import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'

import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component'
import { SlideshowComponent } from 'src/app/shared/components/slideshow/slideshow.component'
import { FooterComponent } from 'src/app/shared/components/footer/footer.component'

import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe'
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe'

import { DataService } from 'src/app/shared/services/data.service'
import { SubmenuComponent } from 'src/app/shared/components/submenu/submenu.component'

@NgModule({
    imports: [CommonModule, RouterModule, NgOptimizedImage],
    exports: [
        NavbarComponent,
        SlideshowComponent,
        FooterComponent,
        SubmenuComponent,
        SafeHtmlPipe,
        SafeUrlPipe,
    ],
    declarations: [
        NavbarComponent,
        SlideshowComponent,
        FooterComponent,
        SubmenuComponent,
        SafeHtmlPipe,
        SafeUrlPipe,
    ],
    providers: [DataService],
})
export class SharedModule {}
