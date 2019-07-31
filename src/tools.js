const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const { sourceDir } = require('./constant/env');
const { log } = require('./utils/util');

function getSources(p) {
    return path.resolve(sourceDir, p);
}

function initConfiguration() {
    const configPath = getSources('ddtool.js');
    const configPathInConfig = getSources('config/ddtool.js');

    let config;

    if (fs.existsSync(configPath) || fs.existsSync(configPathInConfig)) {
        if (fs.existsSync(configPath)) {
            config = require(configPath); // eslint-disable-line
        } else {
            config = require(configPathInConfig); // eslint-disable-line
        }
    } else {
        log(
            chalk.black.bgGreen('error') +
                chalk.green(' 没有找到 ddtool.js 请添加 ddtool.js 配置, 查看详细配置') +
                chalk.blue.underline.bold('https://github.com/biggersun/vue-cli-plugin-ddtool/blob/master/README.md'),
        );
        return undefined;
    }

    return config;
}

function getPages() {
    const { pages = './src/modules/*', pagesEntry = './main.js', pagesTemplate = './index.{pug,html}' } = initConfiguration();

    const pagesFolders = glob.sync(getSources(pages));

    const pagesConfig = pagesFolders.reduce((pre, folder) => {
        const entry = path.resolve(folder, pagesEntry);
        const template = glob.sync(path.resolve(folder, pagesTemplate))[0];
        const pageName = path.basename(folder);

        if (!fs.existsSync(entry)) {
            throw new Error(`${entry} does not exists`);
        }

        if (!fs.existsSync(template)) {
            throw new Error(`${template} does not exists`);
        }

        return {
            ...pre,
            [pageName]: {
                entry,
                template,
                filename: `${pageName}.html`,
            },
        };
    }, {});

    return pagesConfig;
}

module.exports = {
    initConfiguration,
    getPages,
};