export interface ICityInputProps {
  isLoading: boolean;
  city: string;
  handleChangeCity: (search: string, resetLocations?: boolean) => void;
}
