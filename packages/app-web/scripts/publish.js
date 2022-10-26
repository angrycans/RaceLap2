// @ts-check
const execa = require('execa');
const path = require('path');

const { version } = require('../package.json');

execa.sync(`node ${path.join(__dirname, '../node_modules/appcenter-cli/bin/appcenter.js')} distribute release -a racelap/racelap-web -g Production -f web.bundle.zip -b ${version}`, {
  shell: true,
  stdio: 'inherit',
});
