import { IFilter } from './filter';
import { IWine, IEntry, IWineState } from './wine';

export interface IApp {
    filter: IFilter;
    wine: IWineState;
}