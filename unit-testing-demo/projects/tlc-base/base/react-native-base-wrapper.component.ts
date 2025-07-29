import { ViewStyle, TextStyle } from 'react-native';
import { BaseComponentConfig, EventMeta } from '../interfaces/components/common';

/**
 * Standardized event structure for all TLC component lifecycle and user interaction events
 */
export interface TLCComponentEvent {
  /** Event type identifier (e.g., 'initialized', 'press', 'textChanged', 'destroyed') */
  type: string;
  /** Unique identifier of the component instance that triggered the event */
  componentId: string;
  /** Unix timestamp when the event occurred */
  timestamp: number;
  /** Optional event-specific payload data */
  data?: any;
  /** Additional metadata for advanced event handling */
  eventMeta?: EventMeta;
}

/**
 * Abstract base class providing foundational architecture for all TLC components.
 * Handles configuration management, style computation, lifecycle events, and common patterns.
 * 
 * @template T - Component configuration type extending BaseComponentConfig
 * @template E - Event type extending TLCComponentEvent
 */
export abstract class ReactBaseTLCWrapper<T extends BaseComponentConfig, E extends TLCComponentEvent = TLCComponentEvent> {
  /** Current merged component configuration object */
  private _config!: T;
  /** Immutable component identifier for accessibility and testing */
  private _staticId!: string;
  /** Cached computed styles that don't change with state */
  private _staticStyle!: ViewStyle | TextStyle;
  /** Flag tracking whether component initialization callback has been executed */
  private _initialized: boolean = false;
  /** Previous configuration state for change detection and comparison */
  private _previousConfig?: T;
  
  /** Optional callback function for handling component events */
  public onEvent?: (e: E) => void;

  /**
   * Initializes component with configuration and optional event handler
   * @param input - Component configuration object
   * @param onEvent - Optional callback for component events
   */
  constructor(input: T, onEvent?: (e: E) => void) {
    this.onEvent = onEvent;
    this.useLifecycle(input);
  }

  /**
   * Sets up component lifecycle with configuration and initialization
   * @param input - Component configuration to apply
   */
  protected useLifecycle(input: T): void {
    this._config = input;
    
    this._previousConfig = { ...this._config };
    this._staticId = this._config.id;
    
    if (this._config.init && !this._initialized) {
      this._config.init();
      this._initialized = true;
    }
  }

  /**
   * Returns the current component configuration
   * @returns Current configuration object
   */
  protected config(): T {
    return this._config;
  }

  /**
   * Gets the immutable component identifier
   * @returns Component ID string for accessibility and testing
   */
  get staticId(): string {
    return this._staticId;
  }

  /**
   * Gets cached static styles computed once during initialization
   * @returns Cached static styles that don't change with component state
   */
  get staticStyle(): ViewStyle | TextStyle {
    if (!this._staticStyle) {
      this._staticStyle = this.computeStaticStyle();
    }
    return this._staticStyle;
  }

  /**
   * Gets dynamic styles computed on each access based on current state
   * @returns Styles that change with component state (disabled, visible, etc.)
   */
  get dynamicStyle(): ViewStyle | TextStyle {
    return this.computeDynamicStyle();
  }

  /**
   * Updates component configuration and triggers change detection
   * @param config - New configuration to apply
   */
  updateConfig(config: T): void {
    const previousConfig = this._previousConfig;
    
    this._config = config;
    
    if (previousConfig) {
      this.onConfigChange(previousConfig, this._config);
    }
    
    this._previousConfig = { ...this._config };
  }

  /**
   * Abstract method that child classes must implement to define component rendering
   * @returns React node representing the rendered component
   */
  abstract render(): React.ReactNode;

  /**
   * Lifecycle hook called when configuration changes, allowing child classes to react to specific changes
   * @param _previousConfig - Previous configuration state
   * @param _currentConfig - New configuration state
   */
  protected onConfigChange(_previousConfig: T, _currentConfig: T): void {
  }

  /**
   * Computes static styles that don't change with component state
   * @returns Static ViewStyle or TextStyle object from configuration
   */
  protected computeStaticStyle(): ViewStyle | TextStyle {
    const cfg = this.config();
    const staticStyles: any = {};
    
    if (cfg.stl) {
      const { opacity, display, ...otherStyles } = cfg.stl as any;
      Object.assign(staticStyles, otherStyles);
    }
    
    return staticStyles;
  }

  /**
   * Computes dynamic styles that change based on component state (disabled, visible, etc.)
   * @returns Dynamic ViewStyle or TextStyle object based on current state
   */
  protected computeDynamicStyle(): ViewStyle | TextStyle {
    const cfg = this.config();
    const styles: any = {};
    
    /** Apply disabled state styling */
    if (cfg.disabled) {
      if (cfg.disabledOpacity !== undefined) {
        styles.opacity = cfg.disabledOpacity;
      } else {
        styles.opacity = 0.6;
      }
      
      if (cfg.disabledTextColor) {
        styles.color = cfg.disabledTextColor;
      }
    }
    
    /** Hide component when visibility is explicitly set to false */
    if (cfg.visible === false) {
      styles.display = 'none';
    }
    
    /** Apply dynamic styles from configuration that depend on current state */
    if (cfg.stl) {
      const { opacity, display } = cfg.stl as any;
      if (opacity !== undefined && !cfg.disabled) {
        styles.opacity = opacity;
      }
      if (display !== undefined && cfg.visible !== false) {
        styles.display = display;
      }
    }
    
    return styles;
  }

  /**
   * Emits component initialization event when component is ready
   */
  public initializeEvent(): void {
    this.onEvent?.({
      type: 'initialized',
      componentId: this.staticId,
      timestamp: Date.now()
    } as E);
  }

  /**
   * Centralized visibility logic for conditional component rendering
   * @returns True if component should be hidden, false if it should be visible
   */
  protected shouldHideComponent(): boolean {
    const cfg = this.config();
    
    /** Explicit visibility toggle */
    if (cfg.visible === false) return true;
    /** Angular-style conditional rendering (boolean) */
    if (cfg.ngIf === false) return true;
    /** Angular-style conditional rendering (function) */
    if (typeof cfg.ngIf === 'function' && !cfg.ngIf()) return true;
    
    return false;
  }

  /**
   * Component cleanup with destruction event emission and lifecycle callback execution
   */
  public cleanup(): void {
    this.onEvent?.({
      type: 'destroyed',
      componentId: this.staticId,
      timestamp: Date.now()
    } as E);
    
    const cfg = this.config();
    
    if (cfg.destroy && this._initialized) {
      cfg.destroy();
      this._initialized = false;
    }
  }
}