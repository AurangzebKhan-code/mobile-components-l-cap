import type { ConfigAPI, TransformOptions } from '@babel/core';

export default function (api: ConfigAPI): TransformOptions {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { loose: true }],
      ['@babel/preset-env', { loose: true }],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      'react-native-reanimated/plugin',
    ],
  };
};