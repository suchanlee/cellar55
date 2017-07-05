import { IFilter } from "./types/filter";
import { IApp } from "./types/main";
import { IWine } from "./types/wine";

export const emptyFilter: IFilter = {
  name: "",
  regions: [],
  varietals: [],
  vintage: "",
  vintage_from: "",
  vintage_to: "",
  wine_types: [],
};

export const initialState: IApp = {
  filterState: {
    current: emptyFilter,
    initial: emptyFilter,
    isOpen: true
  },
  wine: {
    allWines: [] as IWine[],
    entry: undefined,
    error: undefined,
    isFetchingEntry: false,
    isQueryingWines: true,
    selectedWine: undefined,
    wines: [] as IWine[],
  },
};
