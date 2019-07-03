const cmdType = process.env.NODE_ENV;
const { proxyConfig } = require('./ddtool');

const config = {};
/**
 * 开发环境下动态代理
 */
if (cmdType === 'development' || /^test/.test(cmdType)) {
    const proxyJson = proxyConfig(cmdType);

    config['devServer'] = {
      disableHostCheck: true,
      proxy: proxyJson
    };
}

module.exports = config;