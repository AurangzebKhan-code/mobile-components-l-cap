import React from 'react';
import { render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { TLCLabel, createLabelConfig } from '../../src/components/tlc-label';
import { TLCLabelEvent } from '../../src/core/types/TLCLabelTypes';

interface MockFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  mock: {
    calls: Parameters<T>[];
  };
}

interface JestMatchers {
  toBeTruthy(): void;
  toBe(expected: unknown): void;
  toHaveBeenCalled(): void;
  toHaveBeenCalledWith(expected: unknown): void;
  toBeNull(): void;
  toEqual(expected: unknown): void;
}

declare const jest: {
  fn: <T extends (...args: any[]) => any>() => MockFunction<T>;
};

declare const expect: {
  (actual: unknown): JestMatchers;
  objectContaining(expected: Record<string, unknown>): unknown;
  any(constructor: Function): unknown;
};

declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;

describe('TlcLabel - Core Functionality Tests', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<PaperProvider>{component}</PaperProvider>);
  };

  it('renders with correct text and basic functionality', () => {
    const config = createLabelConfig('tlc-label');
    const { getByText, getByTestId } = renderWithProvider(
      <TLCLabel config={config} />
    );
    expect(getByText('Label')).toBeTruthy();
    expect(getByTestId('tlc-label')).toBeTruthy();
  });

  it('renders with custom configuration', () => {
    const config = createLabelConfig('label-test', { text: 'Custom Label Text' });
    
    const { getByText, getByTestId } = renderWithProvider(
      <TLCLabel config={config} />
    );

    expect(getByText('Custom Label Text')).toBeTruthy();
    expect(getByTestId('label-test')).toBeTruthy();
  });

  it('emits textChanged event when text changes', () => {
    const mockOnEvent = jest.fn<(event: TLCLabelEvent) => void>();
    const mockSetState = jest.fn();
    const config = createLabelConfig('setState-test', { 
      text: 'Initial Text',
      setState: mockSetState
    });

    const { rerender } = renderWithProvider(
      <TLCLabel config={config} onEvent={mockOnEvent} />
    );

    const updatedConfig = createLabelConfig('setState-test', { 
      text: 'Updated Text',
      setState: mockSetState
    });

    rerender(
      <PaperProvider>
        <TLCLabel config={updatedConfig} onEvent={mockOnEvent} />
      </PaperProvider>
    );

    const textChangedEvents = mockOnEvent.mock.calls.filter(
      call => call[0].type === 'textChanged'
    );
    expect(textChangedEvents.length).toBe(1);
    expect(textChangedEvents[0][0]).toEqual(
      expect.objectContaining({
        type: 'textChanged',
        componentId: 'setState-test',
        data: {
          text: 'Updated Text',
          previousText: 'Initial Text'
        }
      })
    );

    expect(mockSetState).toHaveBeenCalledWith(updatedConfig);
  });

  it('calls init callback on mount', () => {
    const initMock = jest.fn<() => void>();
    const mockOnEvent = jest.fn<(event: TLCLabelEvent) => void>();
    const config = createLabelConfig('init-test', { 
      text: 'Init Test'
    });
    (config as any).init = initMock;

    renderWithProvider(
      <TLCLabel config={config} onEvent={mockOnEvent} />
    );

    expect(initMock).toHaveBeenCalled();
    
    expect(mockOnEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'initialized',
        componentId: 'init-test'
      })
    );
  });

  it('handles visibility control with ngIf', () => {
    const config = createLabelConfig('visibility-test', { 
      text: 'Hidden Label',
      ngIf: false 
    });

    const { queryByText } = renderWithProvider(
      <TLCLabel config={config} />
    );

    expect(queryByText('Hidden Label')).toBeNull();
  });
});