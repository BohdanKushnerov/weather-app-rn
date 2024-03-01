import { ISearchLocation } from "./ISearchLocation";

export interface ISavedLocations {
  savedLocations: ISearchLocation[] | null;
  keyboardHide: () => void;
  handleDeleteCityFromStorage: (name: string, region: string) => Promise<void>;
}
