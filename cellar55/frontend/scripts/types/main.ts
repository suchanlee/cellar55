import { IFilterState } from "./filter";
import { IWine, IWineState } from "./wine";

export interface IApp {
  filterState: IFilterState;
  wine: IWineState;
}
