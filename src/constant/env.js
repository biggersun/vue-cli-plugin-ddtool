const { resolve } = require('path');
const { name } = require('../../package.json');

const sourceDir = process.cwd();
const cliService = resolve(sourceDir, 'node_modules/.bin/vue-cli-service');
const package = resolve(sourceDir, `node_modules/${name}`);
const srcDir = resolve(package, 'src');
const scriptsDir = resolve(srcDir, 'scripts');

module.exports = {
    cliService,
    package,
    scriptsDir,
};
