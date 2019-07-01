const fs = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const { sourceDir } = require('./constant/env');
const { log } = require('./utils/util');
const deploy = require('./deploy');
const development = require('./development');

function initConfiguration() {
    const configPath = resolve(sourceDir, 'ddtool.js');
    const configPathInConfig = resolve(sourceDir, 'config/ddtool.js');

    let config;

    if (fs.existsSync(configPath) || fs.existsSync(configPathInConfig)) {
        if (fs.existsSync(configPath)) {
            config = require(configPath); // eslint-disable-line
        } else {
            config = require(configPathInConfig); // eslint-disable-line
        }
    } else {
        log(
            chalk.black.bgGreen('error')
                + chalk.green(' 没有找到 ddtool.js 请添加 ddtool.js 配置, 查看详细配置')
                + chalk.blue.underline.bold('https://github.com/biggersun/vue-cli-plugin-ddtool/blob/master/README.md'),
        );
        return undefined;
    }

    return config;
}

const plugin = (api) => {
    const config = initConfiguration();

    api.registerCommand(
        'dev',
        {
            description: 'start local development service',
            usage: 'vue-cli-service dev [options]',
            options: {
                '--env': 'development service proxy address',
            },
        },
        (args) => {
            development(args, config, api);
        },
    );

    api.registerCommand(
        'deploy',
        {
            description: 'deploy tools',
            usage: 'vue-cli-service deploy [options]',
            options: {
                '--env': 'deploy service key',
            },
        },
        (args) => {
            log(args);

            deploy(args, config, api);
        },
    );
};

module.exports = plugin;
