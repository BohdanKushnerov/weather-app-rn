export interface ISettingsSwitchProps {
  name: string;
  value: boolean;
  handleChange: () => void;
  activeText: string;
  inActiveText: string;
}
