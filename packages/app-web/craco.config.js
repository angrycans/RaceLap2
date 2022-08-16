// @ts-check

// https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-overview

/**
 * webpack config
 * @typedef { import('webpack').Configuration } Configuration
 */

const CracoLessPlugin = require('@dr2009/craco-less');
const path = require('path');
const webpack = require('webpack');
const { whenProd, whenDev } = require('@craco/craco');
const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]';

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    process.env.BUILD_PATH = 'web.bundle';
  }

  return {
    typescript: { enableTypeChecking: false },
    eslint: {
      enable: false
    },
    webpack: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // 'antd-mobile': 'antd-mobile/2x',
      },
      plugins: [
        ...whenDev(() => [new webpack.DefinePlugin({ __DEV__: true })], []),
        ...whenProd(() => [new webpack.DefinePlugin({ __DEV__: false })], []),
      ],
      /** @type { (webpackConfig: Configuration, opts: { env: string, paths: import('react-scripts/config/paths') }) => Configuration } */
      configure: (webpackConfig, { env, paths }) => {
        return webpackConfig;
      },
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    plugins: [
      // 项目自身的 less 配置
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            additionalData: `@import (reference) '@/mixins.less';`,
            lessOptions: {
              modifyVars: {},
              javascriptEnabled: true,
            },
          },
          cssLoaderOptions: {
            modules: {
              localIdentName: CSS_MODULE_LOCAL_IDENT_NAME,
            },
          },
          modifyLessRule: (lessRule, _context) => {
            return lessRule;
          },
          modifyLessModuleRule: (lessRule, _context) => {
            lessRule.exclude = [/node_modules/]; // antd less文件不需要css modules
            return lessRule;
          },
        },
      },
    ],
    style: {
      modules: {
        localIdentName: CSS_MODULE_LOCAL_IDENT_NAME,
      },
    },
    babel: {
      plugins: [
        [
          '@dr.pogodin/react-css-modules',
          {
            webpackHotModuleReloading: true,
            autoResolveMultipleImports: true,
            generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,
            filetypes: {
              '.less': {
                syntax: 'postcss-less',
              },
            },
          },
        ],
      ],
    },
  };
};
