export interface DayRace {
    day: string
    races: Array<Race>
}

export interface Race {
    name: string
    slug: string
    description: string
    date: string
    prix: number
    type_de_course
    format
    specificite
    complet: boolean
    precision
    nombre_de_places
    age
    prix_pass_compet
    recompense: string
    couleur
    etapes: Etape[]
    yearLimit: number
    medias: Media[]
    horraire_dossard: string
}

export interface Etape {
    affichage_distance: string
    course_id: Course
    description: string
    distance: number
    icone: string
    id: number
    image: null
    type: string
    computedDistance: string
}

export interface Course {
    age: number
    complet: boolean
    couleur: string
    date: '2023-09-09 18:00:00'
    format: string
    id: number
    nombre_de_places: string
    precision: string
    prix: number
    prix_pass_compet: number
    recompense: string
    specificite: null
    type_de_course: string
}

export interface Media {
    description: string
    contenu: { data: { url: string } }
}
