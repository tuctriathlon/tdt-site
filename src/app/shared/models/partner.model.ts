import { DirectusImage } from 'src/app/shared/models/file.model'

export interface Partner {
    nom: string
    ordre_affichage: number
    description: string
    icone: DirectusImage
    url?: string
    iconUrl?: string
}
