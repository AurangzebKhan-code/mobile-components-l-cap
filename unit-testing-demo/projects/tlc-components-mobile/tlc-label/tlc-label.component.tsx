import React from 'react';
import { Text } from 'react-native-paper';
import { TextStyle } from 'react-native';
import { ReactBaseTLCWrapper } from '../../tlc-base';
import { 
  TLCLabelConfig, 
  TLCLabelProps,
  TLCLabelEvent
} from '../../tlc-base';

/**
 * Internal wrapper class handling TLC Label specific logic with automatic text change detection
 * Extends ReactBaseTLCWrapper to provide label-specific functionality
 */
class TLCLabelWrapper extends ReactBaseTLCWrapper<TLCLabelConfig, TLCLabelEvent> {
  /**
   * Detects text content changes and emits textChanged events with previous/current values
   * @param previousConfig - Previous label configuration state
   * @param currentConfig - Current label configuration state
   */
  protected onConfigChange(previousConfig: TLCLabelConfig, currentConfig: TLCLabelConfig): void {
    /** Check if text content has actually changed */
    if (previousConfig.text !== currentConfig.text) {
      this.onEvent?.({
        type: 'textChanged',
        componentId: this.staticId,
        data: {
          text: currentConfig.text,
          previousText: previousConfig.text,
        },
        timestamp: Date.now()
      });
      
      /** Execute optional state update callback if provided */
      if (currentConfig.setState) {
        currentConfig.setState(currentConfig);
      }
    }
  }
  
  /**
   * Renders the text label component with Material Design styling and accessibility features
   * @returns React Text component or null if component should be hidden
   */
  render(): React.ReactNode {
    const cfg = this.config();
    
    /** Apply centralized visibility logic */
    if (this.shouldHideComponent()) return null;
    
    return (
      <Text
        style={[this.staticStyle as TextStyle, this.dynamicStyle as TextStyle]}
        testID={cfg.id}
      >
        {cfg.text?.toString()}
      </Text>
    );
  }

}

/**
 * React functional component that bridges TLCLabel wrapper with React lifecycle management.
 * Handles wrapper instance creation, configuration updates, and event handling.
 * 
 * @param config - Label configuration object containing text, styling, and behavior settings
 * @param onEvent - Optional callback function for handling label events
 */
export const TLCLabel: React.FC<TLCLabelProps> = ({ config, onEvent }) => {
  
  /** Memoized wrapper instance - only recreated when component ID changes */
  const wrapper = React.useMemo(() => {
    return new TLCLabelWrapper(config, onEvent);
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

export default TLCLabel;