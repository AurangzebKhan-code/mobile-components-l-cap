import * as path from 'path';
import type { Configuration } from 'webpack';

const projectRoot = path.resolve(__dirname, '..');

const config: Configuration = {
  mode: 'development',
  entry: './cypress/support/component.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules[\/\\](?!react-native-vector-icons|@expo\/vector-icons|@react-native-vector-icons|expo-modules-core|react-native-paper)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
                '@babel/preset-flow',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules[\/\\](?!react-native-vector-icons|@expo\/vector-icons|@react-native-vector-icons|expo-modules-core|react-native-paper)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
              '@babel/preset-flow',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.web.tsx', '.web.ts', '.web.js', '.native.tsx', '.native.ts'],
    alias: {
      '@': path.resolve(projectRoot, 'app'),
      '@components': path.resolve(projectRoot, 'components'),
      'react-native$': require.resolve('react-native-web'),
      'react-native-safe-area-context': path.resolve(projectRoot, 'src/mocks/SafeAreaContext.ts'),
      'react-native/Libraries/Utilities/codegenNativeComponent': false,
      'react-native-reanimated': false,
      'react-native-gesture-handler': false,
    },
    fallback: {
      'path': false,
      'fs': false,
    },
  },
  devtool: 'inline-source-map',
};

module.exports = config;