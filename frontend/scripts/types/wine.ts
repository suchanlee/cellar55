export interface IWine {
    id: number;
    name: string;
    wine_type: string;
    alcohol: string;
    alt_image_url: string;
    country: string;
    farming: string;
    main_image_url: string;
    oak: string;
    production: string;
    region: string;
    soil: string;
    subregion: string;
    varietal: string;
    vintage: string;
    tannin_rating: number;
    body_rating: number;
    acid_rating: number;
    earth_rating: number;
    fruit_rating: number;
    alcohol_rating: number;
    quote: string;
}

export interface IWineResponse {
    count: number;
    wines: IWine[];
}