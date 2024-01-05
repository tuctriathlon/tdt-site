export class Partner {
    nom: String;
    ordre_affichage: Number;
    description: String;
    icone: String;
    url?: String;
}

export class Page {
    id;
    page_name; String;
    url: String;
    parent_page_id?: Object;
}

export class Content {
    titre; String;
    description: String;
    url: String;
    page_id;
}

export class Result {
    annee; String;
    url: String;
    file: String;
}

export class Races {
    days: [{
        day: String;
        races: Array<Race>;
    }]
}

export class Race {
    name: String;
    slug: String;
    day;
    time;
    date;
    prix;
    type_de_course;
    format;
    specificite;
    complet;
    precision;
    nombre_de_places;
    age;
    prix_pass_compet;
    recompense;
    couleur;
}

export class SiteConfig {
    contactez_nous: string
    facebook_url: string
    footer_color: string
    header_color: string
    id: number
    instagram_url: string
    linkedin_url: string
    logo_tdt: number
    titre_tdt: string
    twitter_url: string
}
