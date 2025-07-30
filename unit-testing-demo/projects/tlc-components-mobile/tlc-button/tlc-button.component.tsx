import React from 'react';
import { Button } from 'react-native-paper';
import { ViewStyle, Keyboard, Vibration, GestureResponderEvent } from 'react-native';
import { ReactBaseTLCWrapper } from '../../tlc-base';
import { 
  TLCButtonConfig, 
  TLCButtonProps,
  TLCClickEvent,
  getButtonMode
} from '../../tlc-base';

/**
 * Internal wrapper class handling TLC Button specific logic with press interaction and Material Design theming
 * Extends ReactBaseTLCWrapper to provide button-specific functionality including event handling and styling
 */
class TLCButtonWrapper extends ReactBaseTLCWrapper<TLCButtonConfig> {
  /**
   * Unified click event handler that emits TLCClickEvent
   */
  private tlcClick?: (event: TLCClickEvent) => void;
  
  /**
   * Lifecycle event handlers matching Angular pattern
   */
  private tlcInit?: () => void;
  private tlcDestroy?: () => void;

  /**
   * Override initialization to use separate tlcInit handler instead of generic onEvent
   */
  public initializeEvent(): void {
    this.tlcInit?.();
  }

  /**
   * Override cleanup to use separate tlcDestroy handler instead of generic onEvent
   */
  public cleanup(): void {
    this.tlcDestroy?.();
    
    const cfg = this.config();
    if (cfg.destroy && (this as any)._initialized) {
      cfg.destroy();
      (this as any)._initialized = false;
    }
  }

  /**
   * Renders the interactive button component with Material Design styling, event handlers, and theming
   * @returns React Button component or null if component should be hidden
   */
  render(): React.ReactNode {
    const cfg = this.config();
    
    /** Apply centralized visibility logic */
    if (this.shouldHideComponent()) return null;
    
    /** Convert TLC button type to Material Design button mode */
    const mode = getButtonMode(cfg.type);
    
    return (
      <Button
        mode={mode}
        onPress={(event?: GestureResponderEvent) => {
          /** Dismiss keyboard on button press for better UX */
          Keyboard.dismiss();
          
          /** Apply haptic feedback if enabled in attr */
          if (cfg.attr?.hapticFeedback) {
            Vibration.vibrate(10);
          }
          
          /** Emit standardized TLC click event compatible with Angular */
          const clickEvent: TLCClickEvent = {
            id: cfg.id,
            label: cfg.label,
            eventMeta: {
              timestamp: event?.nativeEvent?.timestamp || Date.now(),
              x: event?.nativeEvent?.pageX || 0,
              y: event?.nativeEvent?.pageY || 0,
              pointerType: 'touch' as const,
            },
          };
          
          // Emit through the unified tlcClick handler if provided
          this.tlcClick?.(clickEvent);
        }}
        onLongPress={cfg.longPress ? (event?: GestureResponderEvent) => {
          /** Emit long press as a click event with additional metadata */
          const clickEvent: TLCClickEvent = {
            id: cfg.id,
            label: cfg.label,
            eventMeta: {
              timestamp: event?.nativeEvent?.timestamp || Date.now(),
              x: event?.nativeEvent?.pageX || 0,
              y: event?.nativeEvent?.pageY || 0,
              pointerType: 'touch' as const,
            },
          };
          
          // Emit through the unified tlcClick handler if provided
          this.tlcClick?.(clickEvent);
        } : undefined}
        disabled={cfg.disabled}
        loading={cfg.loading}
        icon={cfg.icon || cfg.leftIcon}
        buttonColor={mode === 'contained' ? (cfg.color === 'accent' ? '#FF6B6B' : '#125B4E') : undefined}
        textColor={mode === 'text' || mode === 'outlined' ? (cfg.color === 'accent' ? '#FF6B6B' : '#125B4E') : '#FFFFFF'}
        contentStyle={[this.staticStyle as ViewStyle, this.dynamicStyle as ViewStyle]}
        testID={(cfg.attr?.testID as string) || cfg.id}
        accessibilityHint={cfg.attr?.accessibilityHint as string | undefined}
      >
        {cfg.label}
      </Button>
    );
  }

}

// TLCButtonProps already includes tlcClick now

/**
 * React functional component that bridges TLCButton wrapper with React lifecycle management.
 * Handles wrapper instance creation, configuration updates, event handling, and Material Design theming.
 * 
 * @param config - Button configuration object containing label, type, styling, and interaction settings
 * @param tlcClick - Optional callback function for handling click events (press, longPress)
 * @param tlcInit - Optional callback function for component initialization
 * @param tlcDestroy - Optional callback function for component destruction
 */
export const TLCButton: React.FC<TLCButtonProps> = ({ config, tlcClick, tlcInit, tlcDestroy }) => {
  
  /** Memoized wrapper instance - only recreated when component ID changes */
  const wrapper = React.useMemo(() => {
    return new TLCButtonWrapper(config);
  }, [config.id]);
  
  /** Update wrapper configuration when config prop changes (triggers change detection) */
  React.useEffect(() => {
    wrapper.updateConfig(config);
  }, [config, wrapper]);
  
  /** Update tlcClick handler when tlcClick prop changes */
  React.useEffect(() => {
    (wrapper as any).tlcClick = tlcClick;
  }, [tlcClick, wrapper]);
  
  /** Update tlcInit handler when tlcInit prop changes */
  React.useEffect(() => {
    (wrapper as any).tlcInit = tlcInit;
  }, [tlcInit, wrapper]);
  
  /** Update tlcDestroy handler when tlcDestroy prop changes */
  React.useEffect(() => {
    (wrapper as any).tlcDestroy = tlcDestroy;
  }, [tlcDestroy, wrapper]);

  /** Emit initialization event when wrapper is first created */
  React.useEffect(() => {
    wrapper.initializeEvent();
  }, [wrapper]);
  
  /** Cleanup wrapper and emit destruction event on component unmount */
  React.useEffect(() => {
    return () => {
      wrapper.cleanup();
    };
  }, [wrapper]);
  
  return <>{wrapper.render()}</>;
};

export default TLCButton;