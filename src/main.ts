import { registerLocaleData } from '@angular/common'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import localeFr from '@angular/common/locales/fr'
import { enableProdMode, inject, LOCALE_ID, provideAppInitializer } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { AppComponent } from 'src/app/app.component'
import { routes } from 'src/app/main/main-routing'
import { DataService } from 'src/app/shared/services/data.service'
import { environment } from 'src/environments/environment'

registerLocaleData(localeFr)

function initializeAppFactory(dataService: DataService): () => Promise<void> {
    return () => firstValueFrom(dataService.loadConfig())
}

if (environment.production) {
    enableProdMode()
}

bootstrapApplication(AppComponent, {
    providers: [
        provideAppInitializer(() => {
            const initializerFn = initializeAppFactory(inject(DataService))
            return initializerFn()
        }),
        {
            provide: LOCALE_ID,
            useValue: 'fr-FR',
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withInMemoryScrolling({
            scrollPositionRestoration: 'enabled',
        }))
    ]
}).catch((err) => console.log(err))
