const fs= require('fs');
const { srcDir } = require('./constant/env');
const { log } = require('./utils/util');
const chalk = require('chalk');

function initConfiguration() {
    let configPath = resolve(srcDir, 'ddtool.js');

    if (!fs.existsSync(configPath)) {
        configPath = resolve(srcDir, 'config/ddtool.js');
    } else {
        log(chalk.red('没有找到 ddtool.js'));
        return;
    }

    const config = require(configPath);

    console.log(config);
}

module.exports = (api, projectOptions) => {
    // console.log(projectOptions);
    initConfiguration();

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
            console.log(args);
            require('./development')(args, api);
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
            console.log(args);
            require('./deploy')(args, api);
        },
    );
};
