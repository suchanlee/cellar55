import { IFilter } from './filter';
import { IWine } from './wine';

export interface IApp {
    filter: IFilter;
    wine: {
        isFetching: boolean;
        allWines: IWine[];
        wines: IWine[];
        currentWine: IWine;
        error: string;
    };
}