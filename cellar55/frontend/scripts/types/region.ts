export enum RegionType {
  SUBREGION,
  REGION,
  COUNTRY
}

export interface IRegion {
  type: RegionType;
  name: string;
}
