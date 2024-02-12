import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { map } from 'rxjs/operators'
import { Content } from 'src/app/shared/models/content.model'
import { Page } from 'src/app/shared/models/page.model'
import { Partner } from 'src/app/shared/models/partner.model'
import { Race } from 'src/app/shared/models/race.model'
import { SiteConfig } from 'src/app/shared/models/site-config.model'

@Injectable({
    providedIn: 'root',
})
export class DataService {
    PREFIX = 'https://admin.triathlondetoulouse.com/tdt'

    config: BehaviorSubject<SiteConfig> = new BehaviorSubject<SiteConfig>(null)
    pages = new BehaviorSubject<Page[]>([])
    medias = new BehaviorSubject([])
    results = new BehaviorSubject([])
    inscriptions = new BehaviorSubject([])
    races: BehaviorSubject<Race[]> = new BehaviorSubject<Race[]>([])
    contents: BehaviorSubject<Content[]> = new BehaviorSubject([])

    mainBackgroundColor: string = '#3F51B5'
    mainTextColor: string = '#ffffff'

    constructor(private http: HttpClient) {
        document.documentElement.style.setProperty(
            '--main-background-color',
            this.mainBackgroundColor
        )
        document.documentElement.style.setProperty('--main-text-color', this.mainTextColor)

        this.getData<Content>(`/items/information_content?sort=ordre_affichage`).subscribe(
            (contents) => this.contents.next(contents)
        )

        this.getData<Page>(`/items/pages_collection?fields=*&sort=ordre_affichage`).subscribe(
            (pages) => this.pages.next(pages)
        )

        this.getData(`/items/medias?fields=*.*&sort=-annee`).subscribe((medias) =>
            this.medias.next(medias)
        )

        this.getData(`/items/resultats?fields=*.*&sort=-annee`).subscribe((results) =>
            this.results.next(results)
        )

        this.getData(`/items/inscription_etape?fields=*.*&sort=ordre_affichage`).subscribe(
            (inscriptions) => this.inscriptions.next(inscriptions)
        )
    }

    loadConfig() {
        return this.getData<SiteConfig>(`/items/general_information?limit=1`).pipe(
            tap((configs) => {
                const config = configs[0]
                if (config.header_color) {
                    this.mainBackgroundColor = config.header_color
                    this.mainTextColor = this.computeTextColor(this.mainBackgroundColor)
                    document.documentElement.style.setProperty(
                        '--main-background-color',
                        this.mainBackgroundColor
                    )
                    document.documentElement.style.setProperty(
                        '--main-text-color',
                        this.mainTextColor
                    )
                }
            }),
            map((configs) => this.config.next(configs[0]))
        )
    }
    getGlobalConfig() {
        return this.config
    }

    getHome() {
        return this.getData<Content>(`/items/home_page?fields=*.*&sort=-created_on`)
    }

    getPartners() {
        return this.getData<Partner>(`/items/partenaires?fields=*.*&sort=ordre_affichage`)
    }

    getResults() {
        return this.results
    }

    getMedias() {
        return this.medias
    }

    getPages() {
        return this.pages
    }

    getContent(pageId: number) {
        return this.contents.pipe(
            map((contents) => contents.filter((content) => content.page_id === pageId))
        )
    }

    getInscriptionSteps() {
        return this.inscriptions
    }

    getRaces() {
        return this.getData<Race>(`/items/courses?fields=*.*.*&sort=date`).pipe(
            map((races) => {
                return races.map((race) => {
                    race.name = race.type_de_course + ' ' + race.format
                    race.name = race.specificite ? race.name + ' ' + race.specificite : race.name
                    race.slug = race.name.replace(' ', '-').toLowerCase()
                    race.etapes.forEach((etape) => {
                        etape.computedDistance =
                            etape.affichage_distance === 'm'
                                ? etape.distance.toString()
                                : (etape.distance / 1000).toString()
                        etape.computedDistance += ' ' + etape.affichage_distance
                    })
                    if (race.age) {
                        race.yearLimit = new Date(race.date).getFullYear() - race.age
                    }
                    return race
                })
            })
        )
    }

    private getData<T>(url): Observable<T[]> {
        return this.http
            .get<{ data: T[]; public: boolean }>(`${this.PREFIX}${url}`)
            .pipe(map((res) => res.data))
    }

    /**
     * Compute the text color based on the background color
     * @param color
     * @private
     */
    private computeTextColor(color: string) {
        // Remove the '#' if it's included
        const hexColor = color.replace('#', '')

        // Convert hex to RGB
        const r = parseInt(hexColor.substring(0, 2), 16)
        const g = parseInt(hexColor.substring(2, 4), 16)
        const b = parseInt(hexColor.substring(4, 6), 16)

        // Calculate the luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

        // Determine if color is dark or light
        if (luminance > 0.5) {
            return '#000000' // Return white for dark colors
        } else {
            return '#ffffff' // Return black for light colors
        }
    }
}
