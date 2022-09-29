// @ts-check

const execa = require('execa');
const fs = require('fs');

const DEST = `${process.env.CONFIGURATION_BUILD_DIR}/${process.env.UNLOCALIZED_RESOURCES_FOLDER_PATH}`
// const DEST = `${process.env.CONFIGURATION_BUILD_DIR}/test`
execa.sync(`npx react-native bundle --entry-file='index.js' --bundle-output='${DEST}/main.jsbundle' --dev=false --platform='ios' --assets-dest='${DEST}'`, { shell: true, stdio: 'inherit' });

if (!fs.existsSync(`${DEST}/main.jsbundle`)) {
  throw new Error(`main.jsbundle Missing !`)
}

// throw new Error(DEST);
// console.error('DEST ==>', DEST)


