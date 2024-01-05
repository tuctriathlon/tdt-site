import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

function initializeAppFactory(dataService: DataService): () => Promise<void> {
    return () => firstValueFrom(dataService.loadConfig())
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        MainModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [DataService],
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useValue: 'fr-FR'
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
