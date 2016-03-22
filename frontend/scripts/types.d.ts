declare module Types {

    interface Wine {
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

    interface WineResponse {
        count: number;
        wines: Wine[];
    }

    interface FiltersDelta {
        countries?: string[];
        regions?: string[];
        subregions?: string[];
        wine_types?: string[];
        varietals?: string[];
        vintage?: string;
        vintage_from?: string;
        vintage_to?: string;
        name?: string;
    }

    interface Filters {
        countries: string[];
        regions: string[];
        subregions: string[];
        wine_types: string[];
        varietals: string[];
        vintage: string;
        vintage_from: string;
        vintage_to: string;
        name: string;
    }
}
