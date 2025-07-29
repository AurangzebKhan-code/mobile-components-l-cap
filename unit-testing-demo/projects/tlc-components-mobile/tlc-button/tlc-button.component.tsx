import React from 'react';
import { Button } from 'react-native-paper';
import { ViewStyle, Keyboard } from 'react-native';
import { ReactBaseTLCWrapper } from '../../tlc-base';
import { 
  TLCButtonConfig, 
  TLCButtonProps,
  TLCButtonEvent,
  getButtonMode
} from '../../tlc-base';

/**
 * Internal wrapper class handling TLC Button specific logic with press interaction and Material Design theming
 * Extends ReactBaseTLCWrapper to provide button-specific functionality including event handling and styling
 */
class TLCButtonWrapper extends ReactBaseTLCWrapper<TLCButtonConfig, TLCButtonEvent> {
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
        onPress={() => {
          /** Dismiss keyboard on button press for better UX */
          Keyboard.dismiss();
          /** Emit standard press event with button context */
          this.onEvent?.({
            type: 'press',
            componentId: this.staticId,
            data: {
              label: cfg.label,
              status: cfg.status,
            },
            timestamp: Date.now()
          });
        }}
        onLongPress={cfg.longPress ? () => {
          /** Emit long press event only if long press is enabled in config */
          this.onEvent?.({
            type: 'longPress',
            componentId: this.staticId,
            data: {
              label: cfg.label,
            },
            timestamp: Date.now()
          });
        } : undefined}
        disabled={cfg.disabled}
        loading={cfg.loading}
        icon={cfg.icon || cfg.leftIcon}
        buttonColor={mode === 'contained' ? (cfg.color === 'accent' ? '#FF6B6B' : '#125B4E') : undefined}
        textColor={mode === 'text' || mode === 'outlined' ? (cfg.color === 'accent' ? '#FF6B6B' : '#125B4E') : '#FFFFFF'}
        contentStyle={[this.staticStyle as ViewStyle, this.dynamicStyle as ViewStyle]}
        testID={cfg.id}
      >
        {cfg.label}
      </Button>
    );
  }

}

/**
 * React functional component that bridges TLCButton wrapper with React lifecycle management.
 * Handles wrapper instance creation, configuration updates, event handling, and Material Design theming.
 * 
 * @param config - Button configuration object containing label, type, styling, and interaction settings
 * @param onEvent - Optional callback function for handling button events (press, longPress, etc.)
 */
export const TLCButton: React.FC<TLCButtonProps> = ({ config, onEvent }) => {
  
  /** Memoized wrapper instance - only recreated when component ID changes */
  const wrapper = React.useMemo(() => {
    return new TLCButtonWrapper(config, onEvent);
  }, [config.id]);
  
  /** Update wrapper configuration when config prop changes (triggers change detection) */
  React.useEffect(() => {
    wrapper.updateConfig(config);
  }, [config, wrapper]);
  
  /** Update event handler callback when onEvent prop changes */
  React.useEffect(() => {
    wrapper.onEvent = onEvent;
  }, [onEvent, wrapper]);

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