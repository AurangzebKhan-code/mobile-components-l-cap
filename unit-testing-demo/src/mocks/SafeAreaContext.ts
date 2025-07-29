import React from 'react';

interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SafeAreaProviderProps {
  children: React.ReactNode;
}

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const mockSafeAreaInsets: SafeAreaInsets = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

export const SafeAreaContext = React.createContext<SafeAreaInsets>(mockSafeAreaInsets);

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({ children }) => {
  return React.createElement(
    SafeAreaContext.Provider,
    { value: mockSafeAreaInsets },
    children
  );
};

export const useSafeAreaInsets = (): SafeAreaInsets => mockSafeAreaInsets;

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({ children, style, ...props }) => {
  return React.createElement('div', { style, ...props }, children);
};

export const SafeAreaInsetsContext = SafeAreaContext;

export const initialWindowMetrics: SafeAreaInsets = mockSafeAreaInsets;

export default {
  SafeAreaProvider,
  SafeAreaContext,
  SafeAreaView,
  useSafeAreaInsets,
  SafeAreaInsetsContext,
  initialWindowMetrics,
};