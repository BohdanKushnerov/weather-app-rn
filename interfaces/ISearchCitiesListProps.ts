import { ISearchLocation } from "./ISearchLocation";

export interface ISearchCitiesListProps {
  searchLocations: ISearchLocation[];
  handleClickLocation: (location: ISearchLocation) => void;
}
