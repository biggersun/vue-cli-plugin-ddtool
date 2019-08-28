const client = require('scp2');
const { execAsync, getCustomerArgsString } = require('./utils/util');
const { cliService } = require('./constant/env');
const logger = require('./utils/log');

const deploy = async (args, config) => {
    // 发布代码
    logger.info('正在build项目');

    try {
        await execAsync(`${cliService} build ${getCustomerArgsString(args)}`);
    } catch (error) {
        logger.warn('build 失败');
        return;
    }

    logger.success('build 成功');

    const plat = config.platMap[args.env];

    const params = {
        host: plat.ip,
        port: plat.sshPort || 22,
        username: plat.username,
        password: plat.password,
        path: plat.serverPath,
    };

    client.scp('dist/', params, err => {
        if (err) {
            logger.warn('发布失败');
            console.log(err); // eslint-disable-line
        } else {
            logger.success('发布成功');
        }
    });
};

module.exports = deploy;
