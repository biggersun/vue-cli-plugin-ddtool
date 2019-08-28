const deploy = require('./deploy');
const development = require('./development');
const { initConfiguration } = require('./tools');
const { getPagesArgvFromGit } = require('./diff');

const plugin = api => {
    const config = initConfiguration();

    api.registerCommand(
        'dev',
        {
            description: 'start local development service',
            usage: 'vue-cli-service dev [options]',
            options: {
                '--env': 'development service proxy address',
                '--pages': 'development pages name --pages page1,page2,page3',
                '--full': 'do not use incremental development',
            },
        },
        async args => {
            if (!args.pages && config.multiPage) {
                const diffPagesArgv = await getPagesArgvFromGit(config);
                // eslint-disable-next-line no-param-reassign
                args.pages = diffPagesArgv.join(',');
            }

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
                '--pages': 'deploy pages name page1,page2,page3',
                '--full': 'do not use incremental deploy',
            },
        },
        async args => {
            if (!args.pages && config.multiPage) {
                const diffPagesArgv = await getPagesArgvFromGit(config);
                // eslint-disable-next-line no-param-reassign
                args.pages = diffPagesArgv.join(',');
            }

            deploy(args, config, api);
        },
    );
};

module.exports = plugin;
