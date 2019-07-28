const client = require('scp2');
const { execAsync } = require('./utils/util');
const logger = require('./utils/log');

const deploy = async (args, config) => {
    /**
     * build 代码
     * - 是否增量build
     * - 拉取git历史 增量build
     * */
    // 发布代码
    logger.info('正在build项目');

    try {
        await execAsync('npm run build');
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
