const { log, execAsync } = require('./utils/util');
const { cliService, scriptsDir } = require('./constant/env');

function development(args, config, api) {
    const {
        env,
    } = args;

    if (!env) {
        log('请添加 --env 选项 \n -h 查看更多 option');
        return;
    }

    // execAsync(`sh ${scriptsDir}/development.sh ${cliService} ${env}`);
    process.env.NODE_ENV = env;
    execAsync(`${cliService} serve`);
}

module.exports = development;