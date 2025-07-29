// TLCLabel TypeScript interface definitions

import { BaseComponentConfig, EventMeta } from './common';
import { ViewStyle, TextStyle } from 'react-native';

export interface TLCLabelConfig extends BaseComponentConfig {
  text: string;
  stl?: ViewStyle | TextStyle;
  ngIf?: boolean | (() => boolean);
  setState?: (config: TLCLabelConfig) => void;
}

export interface TLCLabelEvent {
  type: 'initialized' | 'destroyed' | 'textChanged';
  componentId: string;
  data?: {
    text?: string;
    previousText?: string;
  };
  eventMeta?: EventMeta;
  timestamp: number;
}

export interface TLCLabelProps {
  config: TLCLabelConfig;
  onEvent?: (event: TLCLabelEvent) => void;
}