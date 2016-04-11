declare module Types {

    interface IWine {
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

    interface IWineResponse {
        count: number;
        wines: IWine[];
    }

    interface IFilterDelta {
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

    interface IFilter {
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

    interface IApp {
        filter: Types.IFilter;
        wine: {
            isFetching: boolean;
            wines: Types.IWine[];
            currentWine: Types.IWine;
            error: string;
        };
    }
}
