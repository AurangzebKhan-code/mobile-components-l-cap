// Base TLC Wrapper - foundational abstract class for all TLC components

import { ViewStyle, TextStyle } from 'react-native';

export interface EventMeta {
  timestamp?: number;
  x?: number;
  y?: number;
  pointerType?: 'mouse' | 'touch' | 'pen';
}

export interface BaseComponentConfig {
  id: string;
  disabled?: boolean;
  visible?: boolean;
  ngIf?: boolean | (() => boolean);
  init?: () => void;
  destroy?: () => void;
  attr?: {
    style?: string;
    class?: string | string[];
    dynamicClass?: string | string[];
    dynamicStyle?: string;
    type?: string;
    [key: string]: string | number | boolean | string[] | undefined;
  };
}

export interface ReactNativeTheme {
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    onSurface: string;
    [key: string]: string;
  };
  fonts: {
    regular: { fontFamily?: string; fontSize?: number; fontWeight?: string };
    medium: { fontFamily?: string; fontSize?: number; fontWeight?: string };
    light: { fontFamily?: string; fontSize?: number; fontWeight?: string };
    thin: { fontFamily?: string; fontSize?: number; fontWeight?: string };
  };
  [key: string]: unknown;
}


// Abstract base class for TLC components using wrapper pattern
export abstract class ReactBaseTLCWrapper<T extends BaseComponentConfig> {
  private _config: T;
  private _theme: ReactNativeTheme;
  private _staticId: string;
  private _staticStyle: ViewStyle | TextStyle;
  private _dynamicStyle: ViewStyle | TextStyle;
  private _initialized: boolean = false;

  protected useLifecycle(input: T): void {
    this._config = {
      ...this.getDefaultConfig(),
      ...input
    } as T;
    
    this._staticId = this._config.id;
    
    if (this._config.init && !this._initialized) {
      this._config.init();
      this._initialized = true;
    }
  }

  protected config(): T {
    return this._config;
  }

  get staticId(): string {
    return this._staticId;
  }

  get staticStyle(): ViewStyle | TextStyle {
    if (!this._staticStyle) {
      this._staticStyle = this.computeStaticStyle();
    }
    return this._staticStyle;
  }

  get dynamicStyle(): ViewStyle | TextStyle {
    return this.computeDynamicStyle();
  }

  get theme(): ReactNativeTheme {
    if (!this._theme) {
      this._theme = this.getDefaultTheme();
    }
    return this._theme;
  }

  setTheme(theme: ReactNativeTheme): void {
    this._theme = theme;
  }

  updateConfig(config: T): void {
    this._config = {
      ...this.getDefaultConfig(),
      ...config
    } as T;
  }

  protected abstract getDefaultConfig(): Partial<T>;

  abstract render(): React.ReactNode;

  protected computeStaticStyle(): ViewStyle | TextStyle {
    return {};
  }

  // Override this method for component-specific dynamic styling
  protected computeDynamicStyle(): ViewStyle | TextStyle {
    const cfg = this.config();
    const styles: ViewStyle = {};
    
    if (cfg.disabled) {
      styles.opacity = 0.6;
    }
    
    if (cfg.visible === false) {
      styles.display = 'none';
    }
    
    return styles;
  }

  protected getAccessibilityProps(): any {
    const cfg = this.config();
    return {
      accessible: true,
      accessibilityLabel: cfg.id,
      testID: cfg.id,
    };
  }

  protected getDefaultTheme(): ReactNativeTheme {
    return {
      colors: {
        primary: '#125B4E',
        accent: '#FF6B6B',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: '#000000',
        disabled: '#999999',
        placeholder: '#666666',
        backdrop: 'rgba(0,0,0,0.5)',
        onSurface: '#000000',
      },
      fonts: {
        regular: { fontFamily: 'System', fontSize: 14, fontWeight: '400' },
        medium: { fontFamily: 'System', fontSize: 16, fontWeight: '500' },
        light: { fontFamily: 'System', fontSize: 12, fontWeight: '300' },
        thin: { fontFamily: 'System', fontSize: 10, fontWeight: '100' },
      }
    };
  }

  protected cleanup(): void {
    const cfg = this.config();
    
    if (cfg.destroy && this._initialized) {
      cfg.destroy();
      this._initialized = false;
    }
  }
}