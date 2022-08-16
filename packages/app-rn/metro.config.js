// @ts-check
//

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const { getPkgInfos } = require('../../scripts/utils');

const moduleMonoInfos = getPkgInfos({ includePrivate: true }).filter(info => info.monoInfo?.type === 'module');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      // @ts-ignore
      ...moduleMonoInfos.reduce((acc, info) => (acc[info.name] = info.location, acc), {}),
    },
    /** @type { (context: any, moduleName: string, platform: string) => any } */
    resolveRequest(context, moduleName, platform) {
      const monoPkg = moduleMonoInfos.find(info => moduleName.startsWith(['.', info.dirname].join(path.sep)) && context.originModulePath === [context.projectRoot, '.'].join(path.sep))
      if (monoPkg) {
        moduleName = `.${moduleName}`
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  watchFolders: [
    ...moduleMonoInfos.map(({ location }) => location),
  ],
};
