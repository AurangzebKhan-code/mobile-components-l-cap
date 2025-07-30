import { ViewStyle, TextStyle } from 'react-native';
import { BaseComponentConfig } from '../interfaces/components/common';


/**
 * Abstract base class providing foundational architecture for all TLC components.
 * Handles configuration management, style computation, lifecycle events, and common patterns.
 * 
 * @template T - Component configuration type extending BaseComponentConfig
 */
export abstract class ReactBaseTLCWrapper<T extends BaseComponentConfig> {
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
  
  /**
   * Initializes component with configuration
   * @param input - Component configuration object
   */
  constructor(input: T) {
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
   * Component initialization hook - override in child classes to implement specific initialization
   */
  public initializeEvent(): void {
    // Override in child classes to implement component-specific initialization
    // Base implementation does nothing - child classes handle their own event emission
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
   * Component cleanup hook - override in child classes to implement specific cleanup
   */
  public cleanup(): void {
    // Override in child classes to implement component-specific cleanup and event emission
    // Base implementation handles standard lifecycle cleanup
    const cfg = this.config();
    
    if (cfg.destroy && this._initialized) {
      cfg.destroy();
      this._initialized = false;
    }
  }
}