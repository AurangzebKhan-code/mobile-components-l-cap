// Configuration utility functions for TLC components

import { TLCButtonConfig } from '../core/types/TLCButtonTypes';
import { TLCLabelConfig } from '../core/types/TLCLabelTypes';

export function createDefaultButtonConfig(id: string): TLCButtonConfig {
  return {
    id,
    visible: true,
    disabled: false,
    color: 'primary',
    type: 'contained',
    loading: false,
    label: 'Press me',
  };
}

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

export function createDefaultLabelConfig(id: string): TLCLabelConfig {
  return {
    id,
    visible: true,
    disabled: false,
    text: 'Label',
  };
}

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

