export interface Content {
    titre: string;
    description: string;
    url: string;
    page_id: number;
    afficher_date: boolean
    created_on?: string
    id: number
    image?: Image
    ordre_affichage?: number
    url_video?: string
}

export interface Image {
    data: { url: string }
}
