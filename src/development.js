const { log, execAsync, getCustomerArgsString } = require('./utils/util');
const { cliService } = require('./constant/env');

function development(
    args,
    config, // eslint-disable-line
    api, // eslint-disable-line
) {
    const {
        env,
        // full, pages
    } = args;
    if (!env) {
        log('请添加 --env 选项 \n -h 查看更多 option');
        return;
    }

    process.env.NODE_ENV = env;

    execAsync(`${cliService} serve ${getCustomerArgsString(args)}`);
}

module.exports = development;
