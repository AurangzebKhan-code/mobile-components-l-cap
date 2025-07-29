// Common component configuration interfaces and types

export interface BaseComponentConfig {
  id: string;
  disabled?: boolean;
  visible?: boolean;
  ngIf?: boolean | (() => boolean);
  init?: () => void;
  destroy?: () => void;
  stl?: any; // Style object for React Native
  disabledOpacity?: number; // Opacity when component is disabled
  disabledTextColor?: string; // Text color when component is disabled
  attr?: {
    style?: string;
    class?: string | string[];
    dynamicClass?: string | string[];
    dynamicStyle?: string;
    type?: string;
    [key: string]: string | number | boolean | string[] | undefined;
  };
}

export interface EventMeta {
  timestamp?: number;
  x?: number;
  y?: number;
  pointerType?: 'mouse' | 'touch' | 'pen';
}

export type ComponentTypes = 'button' | 'label' | 'container' | 'image';