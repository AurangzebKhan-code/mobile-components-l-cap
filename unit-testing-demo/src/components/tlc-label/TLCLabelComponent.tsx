// TLCLabel component implementation with wrapper pattern

import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { TextStyle } from 'react-native';
import { ReactBaseTLCWrapper } from '../../core/base/ReactBaseTLCWrapper';
import { 
  TLCLabelConfig, 
  TLCLabelProps,
  TLCLabelEvent
} from '../../core/types/TLCLabelTypes';


class TLCLabelWrapper extends ReactBaseTLCWrapper<TLCLabelConfig> {
  private previousText: string;
  public onEvent?: (e: TLCLabelEvent) => void;
  
  constructor(
    input: TLCLabelConfig,
    onEvent?: (e: TLCLabelEvent) => void
  ) {
    super();
    this.onEvent = onEvent;
    this.useLifecycle(input);
    this.previousText = input.text;
    
    this.onEvent?.({
      type: 'initialized',
      componentId: this.staticId,
      timestamp: Date.now()
    });
  }

  protected getDefaultConfig(): Partial<TLCLabelConfig> {
    return {
      text: 'Label',
      visible: true,
      disabled: false,
    };
  }

  protected computeStaticStyle(): TextStyle {
    const theme = this.theme;
    
    return {
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.regular.fontFamily || 'System',
    };
  }

  protected computeDynamicStyle(): TextStyle {
    const cfg = this.config();
    const theme = this.theme;
    const styles: TextStyle = {};
    
    if (cfg.stl) {
      Object.assign(styles, cfg.stl);
    }
    
    if (cfg.disabled) {
      styles.opacity = 0.6;
      styles.color = theme.colors.disabled;
    }
    
    if (cfg.visible === false) {
      styles.display = 'none';
    }
    
    return styles;
  }

  protected getAccessibilityProps() {
    const cfg = this.config();
    return {
      accessible: true,
      accessibilityRole: 'text' as const,
      accessibilityLabel: cfg.text || cfg.id,
      accessibilityState: {
        disabled: cfg.disabled || false,
      },
      testID: cfg.id,
    };
  }

  private checkTextChange() {
    const cfg = this.config();
    
    if (cfg.text !== this.previousText) {
      this.onEvent?.({
        type: 'textChanged',
        componentId: this.staticId,
        data: {
          text: cfg.text,
          previousText: this.previousText,
        },
        timestamp: Date.now()
      });
      
      if (cfg.setState) {
        cfg.setState(cfg);
      }
      
      this.previousText = cfg.text;
    }
  }

  // CRITICAL: Text change detection to prevent render loops
  updateConfig(config: TLCLabelConfig): void {
    super.updateConfig(config);
    this.checkTextChange();
  }

  render(): React.ReactNode {
    const cfg = this.config();
    
    if (cfg.visible === false) return null;
    if (cfg.ngIf === false) return null;
    if (typeof cfg.ngIf === 'function' && !cfg.ngIf()) return null;
    
    return (
      <Text
        style={[this.staticStyle, this.dynamicStyle]}
        {...this.getAccessibilityProps()}
      >
        {cfg.text?.toString()}
      </Text>
    );
  }

  cleanup(): void {
    this.onEvent?.({
      type: 'destroyed',
      componentId: this.staticId,
      timestamp: Date.now()
    });
    
    super.cleanup();
  }
}


export const TLCLabel: React.FC<TLCLabelProps> = ({ config, onEvent }) => {
  const paperTheme = useTheme();
  
  const wrapper = React.useMemo(() => {
    const themeWrapper = new TLCLabelWrapper(config, onEvent);
    
    themeWrapper.setTheme({
      colors: {
        primary: paperTheme.colors.primary,
        accent: paperTheme.colors.secondary || paperTheme.colors.primary,
        background: paperTheme.colors.background,
        surface: paperTheme.colors.surface,
        text: paperTheme.colors.onSurface,
        disabled: paperTheme.colors.outline,
        placeholder: paperTheme.colors.onSurfaceVariant,
        backdrop: paperTheme.colors.backdrop,
        onSurface: paperTheme.colors.onSurface,
      },
      fonts: {
        regular: paperTheme.fonts.bodyMedium || {},
        medium: paperTheme.fonts.bodyLarge || {},
        light: paperTheme.fonts.bodySmall || {},
        thin: paperTheme.fonts.labelSmall || {},
      },
    });
    
    return themeWrapper;
  }, [config.id, paperTheme]);
  
  React.useEffect(() => {
    wrapper.updateConfig(config);
  }, [config, wrapper]);
  
  React.useEffect(() => {
    (wrapper as any).onEvent = onEvent;
  }, [onEvent, wrapper]);
  
  React.useEffect(() => {
    return () => {
      wrapper.cleanup();
    };
  }, [wrapper]);
  
  return <>{wrapper.render()}</>;
};

export default TLCLabel;