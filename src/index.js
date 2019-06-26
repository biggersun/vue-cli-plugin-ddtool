const {} = require();

function initConfiguration() {

}

module.exports = (api, projectOptions) => {
    // console.log(projectOptions);

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
