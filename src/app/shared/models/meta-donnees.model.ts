export interface MetaDonnees {
    id: number,
    name: string,
    content: string,
}

export interface MetaDonneesPayload {
    id: number,
    title: string,
    metadonnees: MetaDonnees[],
}
