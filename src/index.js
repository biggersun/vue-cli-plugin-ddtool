const { log } = require('./utils/util');
const deploy = require('./deploy');
const development = require('./development');
const { initConfiguration } = require('./tools');

const plugin = api => {
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
        args => {
            log(args);

            deploy(args, config, api);
        },
    );
};

module.exports = plugin;
