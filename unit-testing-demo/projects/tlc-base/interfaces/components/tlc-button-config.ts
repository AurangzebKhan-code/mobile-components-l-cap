import { BaseComponentConfig } from './common';
import { ViewStyle, TextStyle } from 'react-native';
import { TLCClickEvent } from './event';

export interface TLCButtonConfig extends BaseComponentConfig {
  label: string;
  color?: string;
  type: "text" | "outlined" | "contained" | "RAISED" | "STROKED" | "BASIC";
  size?: 'small' | 'medium' | 'large';
  
  icon?: string;
  leftIcon?: string;
  
  loading?: boolean;
  status?: "checked" | "unchecked";
  
  longPress?: boolean;
  
  accessibilityLabel?: string;
  
  stl?: ViewStyle | TextStyle;
  ngIf?: boolean | (() => boolean);
}


export interface TLCButtonProps {
  config: TLCButtonConfig;
  tlcClick?: (event: TLCClickEvent) => void; // Click events
  tlcInit?: () => void; // Component initialized
  tlcDestroy?: () => void; // Component destroyed
}

export const getButtonMode = (type: string): 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' => {
  switch (type.toUpperCase()) {
    case 'BASIC':
      return 'text';
    case 'STROKED':
      return 'outlined';
    case 'RAISED':
      return 'contained';
    case 'CONTAINED':
      return 'contained';
    case 'OUTLINED':
      return 'outlined';
    case 'TEXT':
      return 'text';
    default:
      return 'text';
  }
};