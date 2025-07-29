import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import { ViewStyle, Keyboard } from 'react-native';
import { ReactBaseTLCWrapper } from '../../core/base/ReactBaseTLCWrapper';
import { 
  TLCButtonConfig, 
  TLCButtonProps,
  TLCButtonEvent,
  getButtonMode
} from '../../core/types/TLCButtonTypes';


class TLCButtonWrapper extends ReactBaseTLCWrapper<TLCButtonConfig> {
  public onEvent?: (e: TLCButtonEvent) => void;
  
  constructor(
    input: TLCButtonConfig,
    onEvent?: (e: TLCButtonEvent) => void
  ) {
    super();
    this.onEvent = onEvent;
    this.useLifecycle(input);
    
    this.onEvent?.({
      type: 'initialized',
      componentId: this.staticId,
      timestamp: Date.now()
    });
  }

  protected getDefaultConfig(): Partial<TLCButtonConfig> {
    return {
      label: 'Press me',
      type: 'contained',
      color: 'primary',
      size: 'medium',
      disabled: false,
      visible: true,
      loading: false,
    };
  }

  protected computeStaticStyle(): ViewStyle {
    const cfg = this.config();
    
    return {
      minHeight: this.getHeightForSize(cfg.size),
      paddingHorizontal: this.getPaddingForSize(cfg.size),
      borderRadius: 8,
      justifyContent: 'center',
    };
  }

  protected computeDynamicStyle(): ViewStyle {
    const cfg = this.config();
    const styles: ViewStyle = {};
    
    if (cfg.stl) {
      Object.assign(styles, cfg.stl);
    }
    
    if (cfg.disabled) {
      styles.opacity = 0.6;
    }
    
    if (cfg.visible === false) {
      styles.display = 'none';
    }
    
    return styles;
  }

  private getHeightForSize(size?: string): number {
    switch (size) {
      case 'small': return 32;
      case 'large': return 48;
      default: return 40;
    }
  }

  private getPaddingForSize(size?: string): number {
    switch (size) {
      case 'small': return 12;
      case 'large': return 20;
      default: return 16;
    }
  }

  private handlePress() {
    const cfg = this.config();
    
    Keyboard.dismiss();
    
    this.onEvent?.({
      type: 'press',
      componentId: this.staticId,
      data: {
        label: cfg.label,
        status: cfg.status,
      },
      eventMeta: {
        timestamp: Date.now()
      },
      timestamp: Date.now()
    });
  }

  private handleLongPress() {
    const cfg = this.config();
    
    this.onEvent?.({
      type: 'longPress',
      componentId: this.staticId,
      data: {
        label: cfg.label,
      },
      timestamp: Date.now()
    });
  }

  protected getAccessibilityProps() {
    const cfg = this.config();
    return {
      accessible: true,
      accessibilityLabel: cfg.accessibilityLabel || cfg.label,
      accessibilityRole: 'button' as const,
      accessibilityState: {
        disabled: cfg.disabled || false,
      },
      testID: cfg.id,
    };
  }

  private getButtonColor(): string {
    const cfg = this.config();
    const theme = this.theme;
    
    if (cfg.color === 'accent') {
      return theme.colors.accent;
    }
    
    return theme.colors.primary;
  }

  private getTextColor(): string {
    const cfg = this.config();
    const theme = this.theme;
    const mode = getButtonMode(cfg.type);
    
    if (mode === 'text' || mode === 'outlined') {
      return cfg.color === 'accent' ? theme.colors.accent : theme.colors.primary;
    }
    
    return '#FFFFFF';
  }

  render(): React.ReactNode {
    const cfg = this.config();
    
    if (cfg.visible === false) return null;
    if (cfg.ngIf === false) return null;
    if (typeof cfg.ngIf === 'function' && !cfg.ngIf()) return null;
    
    const mode = getButtonMode(cfg.type);
    
    return (
      <Button
        mode={mode}
        onPress={() => this.handlePress()}
        onLongPress={cfg.longPress ? () => this.handleLongPress() : undefined}
        disabled={cfg.disabled}
        loading={cfg.loading}
        icon={cfg.icon || cfg.leftIcon}
        buttonColor={mode === 'contained' ? this.getButtonColor() : undefined}
        textColor={this.getTextColor()}
        style={[this.staticStyle, this.dynamicStyle]}
        {...this.getAccessibilityProps()}
      >
        {cfg.label}
      </Button>
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

export const TLCButton: React.FC<TLCButtonProps> = ({ config, onEvent }) => {
  const paperTheme = useTheme();
  
  const wrapper = React.useMemo(() => {
    const themeWrapper = new TLCButtonWrapper(config, onEvent);
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
    wrapper.onEvent = onEvent;
  }, [onEvent, wrapper]);
  
  React.useEffect(() => {
    return () => {
      wrapper.cleanup();
    };
  }, [wrapper]);
  
  return <>{wrapper.render()}</>;
};

export default TLCButton;