// @ts-check
/// <reference types="node" />

const address = require('address');

const isDev = process.env.BABEL_ENV === 'development'

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    // 'react-native-reanimated/plugin',
    [
      "transform-define", {
        "WEBVIEW_BASE_URL": isDev ? `http://${address.ip()}:12345` : '/web.bundle/index.html',
        // "WEBVIEW_BASE_URL": '/web.bundle/index.html',
        // "WEBVIEW_BASE_URL": `http://${address.ip()}:12345`,
      }
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          // '@race-lap/app-helper': path.join(__dirname, '../app-helper/lib/app-helper'),
        },
      },
    ],
  ],
};
