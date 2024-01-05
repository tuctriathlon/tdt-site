export interface Races {
    days: [{
        day: String;
        races: Array<Race>;
    }]
}

export interface Race {
    name: string;
    slug: string;
    day;
    time;
    date;
    prix;
    type_de_course;
    format;
    specificite;
    complet: boolean;
    precision;
    nombre_de_places;
    age;
    prix_pass_compet;
    recompense;
    couleur;
    etapes: Etape[]
    yearLimit: number;
}

export interface Etape {
    affichage_distance: string
    course_id: Course
    description: null
    distance: number
    icone: string
    id: number
    image: null
    type: string
    computedDistance: string;
}

export interface Course {
    age: number
    complet: boolean
    couleur: string
    date: "2023-09-09 18:00:00"
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
