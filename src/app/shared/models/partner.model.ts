import { DirectusImage } from 'src/app/shared/models/file.model'

export interface Partner {
    nom: string
    ordre_affichage: number
    description: string
    icone: DirectusImage
    url?: string
    iconUrl?: string,
    type: PartnerType
}

export enum PartnerType {
    PREMIUM = "0" ,
    OFFICIEL = "1",
    SUPPORTER = "2",
    INSTITUTION = "3",
    FOOD_TRUCK = "4",
    FOURNISSEUR = "5",
    PRINCIPAL = "6",
}
