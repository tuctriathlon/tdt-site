import { DatePipe, NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'

import { MainRoutingModule } from 'src/app/main/main-routing.module'

@NgModule({
    imports: [MainRoutingModule, NgOptimizedImage],
    declarations: [],
    providers: [DatePipe],
})
export class MainModule {}
