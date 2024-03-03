export interface DirectusImage {
    "id": string
    "title": string
    private_hash: string
    "data": {
        url: string
    }
}
export enum ThumbnailNames {
    LARGE_CROP = 'directus-large-crop' ,
    LARGE_CONTAIN = 'directus-large-contain',
    MEDIUM_CONTAIN = 'directus-medium-contain',
    MEDIUM_CROP = 'directus-medium-crop',
    SMALL_CONTAIN = 'directus-small-contain',
    SMALL_CROP = 'directus-small-crop',
}
