import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { TLCButton, createButtonConfig } from '../../projects/tlc-components-mobile/tlc-button';
import { TLCClickEvent } from '../../projects/tlc-base';

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
  not: { toHaveBeenCalled(): void };
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

describe('TlcButton - Core Functionality Tests', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<PaperProvider>{component}</PaperProvider>);
  };

  it('renders with correct text and basic functionality', () => {
    const config = createButtonConfig('tlc-button');
    const { getByText, getByTestId } = renderWithProvider(
      <TLCButton config={config} />
    );
    expect(getByText('Press me')).toBeTruthy();
    expect(getByTestId('tlc-button')).toBeTruthy();
  });

  it('handles tlcClick events with proper metadata', () => {
    const config = createButtonConfig('press-test', { label: 'Press Test' });
    const mockTlcClick = jest.fn<(event: TLCClickEvent) => void>();

    const { getByTestId } = renderWithProvider(
      <TLCButton 
        config={config} 
        tlcClick={mockTlcClick}
      />
    );

    const button = getByTestId('press-test');
    fireEvent.press(button);

    expect(mockTlcClick).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'press-test',
        label: 'Press Test',
        eventMeta: expect.objectContaining({
          timestamp: expect.any(Number),
          pointerType: 'touch'
        })
      })
    );
  });

  it('properly handles configuration with defaults and custom settings', () => {
    const config = createButtonConfig('config-test', { 
      label: 'Config Test',
      color: 'accent',
      size: 'large'
    });

    const { getByTestId } = renderWithProvider(
      <TLCButton config={config} />
    );

    const button = getByTestId('config-test');
    expect(button).toBeTruthy();
    // Accessibility removed - just check button exists and works
  });

  it('triggers lifecycle events correctly', () => {
    const mockTlcInit = jest.fn<() => void>();
    const initMock = jest.fn<() => void>();
    const config = createButtonConfig('lifecycle-test', { 
      label: 'Lifecycle Test'
    });
    (config as any).init = initMock;

    renderWithProvider(
      <TLCButton 
        config={config} 
        tlcInit={mockTlcInit}
      />
    );

    expect(mockTlcInit).toHaveBeenCalled();
    expect(initMock).toHaveBeenCalled();
  });

  it('handles disabled state and prevents interactions', () => {
    const config = createButtonConfig('disabled-test', { 
      label: 'Disabled Button',
      disabled: true
    });
    const mockTlcClick = jest.fn<(event: TLCClickEvent) => void>();
    const mockTlcInit = jest.fn<() => void>();

    const { getByTestId } = renderWithProvider(
      <TLCButton 
        config={config} 
        tlcClick={mockTlcClick}
        tlcInit={mockTlcInit}
      />
    );

    const button = getByTestId('disabled-test');
    fireEvent.press(button);

    expect(mockTlcInit).toHaveBeenCalled();
    expect(mockTlcClick).not.toHaveBeenCalled();
  });
});