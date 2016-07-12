import { IFilterState } from './filter';
import { IWine, IWineState } from './wine';
import { IState } from "./state";

export interface IApp {
    filterState: IFilterState;
    state: IState;
    wine: IWineState;
}