// @ts-check

const execa = require('execa');
const path = require('path');
const { appName, extraArgs } = require('minimist')(process.argv.slice(2));

if (!appName) {
  throw new Error(`Arg appName missing !`);
}

execa.sync(`appcenter release-react -a '${appName}' -d Production ${extraArgs || ''}`, {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
  env: {
    APPCENTER_ACCESS_TOKEN: process.env.APPCENTER_ACCESS_TOKEN
  }
});
