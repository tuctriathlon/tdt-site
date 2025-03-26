import { CommonModule, NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent } from 'src/app/shared/components/footer/footer.component'

import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component'
import { SlideshowComponent } from 'src/app/shared/components/slideshow/slideshow.component'
import { SubmenuComponent } from 'src/app/shared/components/submenu/submenu.component'
import { AccessibleColorDirective } from 'src/app/shared/pipes/accessible-color.pipe'
import { OrderByPipe } from 'src/app/shared/pipes/orderBy.pipe'

import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe'
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe'

import { DataService } from 'src/app/shared/services/data.service'

@NgModule({
    imports: [CommonModule, RouterModule, NgOptimizedImage, AccessibleColorDirective],
    exports: [
        NavbarComponent,
        SlideshowComponent,
        FooterComponent,
        SubmenuComponent,
        SafeHtmlPipe,
        SafeUrlPipe,
        OrderByPipe,
    ],
    declarations: [
        NavbarComponent,
        SlideshowComponent,
        FooterComponent,
        SubmenuComponent,
        SafeHtmlPipe,
        SafeUrlPipe,
        OrderByPipe,
    ],
    providers: [DataService],
})
export class SharedModule {}
