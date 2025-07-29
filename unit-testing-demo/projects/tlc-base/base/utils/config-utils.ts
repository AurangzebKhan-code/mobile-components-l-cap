// Configuration utility functions for TLC components

import { TLCButtonConfig } from '../../interfaces/components/tlc-button-config';
import { TLCLabelConfig } from '../../interfaces/components/tlc-label-config';

/**
 * Creates a default button configuration with sensible defaults for TLCButton components.
 * This function generates a minimal, ready-to-use button config with standard Material Design settings.
 * 
 * @param id - Unique identifier for the button component (required for accessibility and testing)
 * @returns TLCButtonConfig object with default values:
 *   - visible: true (button is shown)
 *   - disabled: false (button is interactive)
 *   - color: 'primary' (uses theme's primary color)
 *   - type: 'contained' (Material Design filled button style)
 *   - loading: false (no loading spinner)
 *   - label: 'Press me' (default button text)
 *   - attr: {} (empty attributes object for extensibility)
 */
export function createDefaultButtonConfig(id: string): TLCButtonConfig {
  return {
    id,
    visible: true,
    disabled: false,
    color: 'primary',
    type: 'contained',
    loading: false,
    label: 'Press me',
    attr: {}
  };
}

/**
 * Creates a customized button configuration by merging default values with user-provided overrides.
 * This is the primary factory function for creating TLCButton configurations with custom properties.
 * Uses a deep merge strategy to properly handle nested objects like 'attr'.
 * 
 * @param id - Unique identifier for the button component
 * @param overrides - Partial configuration object to override default values (optional)
 *   - Can include any valid TLCButtonConfig properties (label, color, type, size, etc.)
 *   - Nested 'attr' object is merged separately to preserve existing attributes
 * @returns Complete TLCButtonConfig with defaults merged with custom overrides
 * 
 * @example
 * // Create a large, secondary button with custom label
 * const config = createButtonConfig('save-btn', {
 *   label: 'Save Changes',
 *   color: 'secondary',
 *   size: 'large',
 *   attr: { 'data-testid': 'save-button' }
 * });
 */
export function createButtonConfig(
  id: string,
  overrides: Partial<TLCButtonConfig> = {}
): TLCButtonConfig {
  return {
    ...createDefaultButtonConfig(id),
    ...overrides,
    attr: {
      ...createDefaultButtonConfig(id).attr,
      ...overrides.attr,
    },
  };
}

/**
 * Creates a default label configuration with sensible defaults for TLCLabel components.
 * This function generates a minimal, ready-to-use label config for text display components.
 * 
 * @param id - Unique identifier for the label component (required for accessibility and testing)
 * @returns TLCLabelConfig object with default values:
 *   - visible: true (label is shown)
 *   - disabled: false (label appears with normal styling)
 *   - text: 'Label' (default display text)
 *   - attr: {} (empty attributes object for extensibility)
 */
export function createDefaultLabelConfig(id: string): TLCLabelConfig {
  return {
    id,
    visible: true,
    disabled: false,
    text: 'Label',
    attr: {}
  };
}

/**
 * Creates a customized label configuration by merging default values with user-provided overrides.
 * This is the primary factory function for creating TLCLabel configurations with custom properties.
 * Uses a deep merge strategy to properly handle nested objects like 'attr'.
 * 
 * @param id - Unique identifier for the label component
 * @param overrides - Partial configuration object to override default values (optional)
 *   - Can include any valid TLCLabelConfig properties (text, visible, disabled, stl, etc.)
 *   - Nested 'attr' object is merged separately to preserve existing attributes
 * @returns Complete TLCLabelConfig with defaults merged with custom overrides
 * 
 * @example
 * // Create a styled label with custom text and styling
 * const config = createLabelConfig('status-label', {
 *   text: 'Connection Status: Active',
 *   stl: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
 *   attr: { 'data-testid': 'status-indicator' }
 * });
 */
export function createLabelConfig(
  id: string,
  overrides: Partial<TLCLabelConfig> = {}
): TLCLabelConfig {
  return {
    ...createDefaultLabelConfig(id),
    ...overrides,
    attr: {
      ...createDefaultLabelConfig(id).attr,
      ...overrides.attr,
    },
  };
}

