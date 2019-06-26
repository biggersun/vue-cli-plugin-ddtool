const { log, execAsync } = require('./utils/util');
const { cliService, scriptsDir } = require('./constant/env');

function development(args, api) {
    const {
        env,
    } = args;

    if (!env) {
        log('请添加 --env 选项 \n -h 查看更多 option');
        return;
    }

    execAsync(`sh ${scriptsDir}/development.sh ${cliService} ${env}`);
}

module.exports = development;