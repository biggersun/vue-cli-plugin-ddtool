const fs = require('fs');
const { resolve } = require('path');
const { sourceDir } = require('./constant/env');
const { log } = require('./utils/util');
const chalk = require('chalk');

function initConfiguration() {
    const configPath = resolve(sourceDir, 'ddtool.js');
    const configPathInConfig = resolve(sourceDir, 'config/ddtool.js');

    let config;

    if (fs.existsSync(configPath) || fs.existsSync(configPathInConfig)) {
        if (fs.existsSync(configPath)) {
            config = require(configPath);
        } else {
            config = require(configPathInConfig);
        }
    } else {
        log(
            chalk.black.bgGreen('error')
            + chalk.green(` 没有找到 ddtool.js 请添加 ddtool.js 配置, 查看详细配置 `)
            + chalk.blue.underline.bold('https://github.com/biggersun/vue-cli-plugin-ddtool/blob/master/README.md')
        );
        return;
    }

    return config;
}

let plugin = (api, projectOptions) => {
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
        args => {
            console.log('dev args', args);

            require('./development')(args, config, api);
        },
    );

    api.registerCommand(
        'deploy',
        {
            description: 'start local development service',
            usage: 'vue-cli-service dev [options]',
            options: {
                '--env': 'development service proxy address',
            },
        },
        args => {
            log(args);

            require('./deploy')(args, config, api);
        },
    );
}

module.exports = plugin;
