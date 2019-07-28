const cmdType = process.env.NODE_ENV;
const { getPages } = require('vue-cli-plugin-ddtool/src/tools');
const { proxyConfig } = require('./ddtool');

const config = {
  pages: getPages(),
  publicPath: '/',
};

/**
 * 开发环境下动态代理
 */
if (cmdType === 'development' || /^test/.test(cmdType)) {
    const proxyJson = proxyConfig(cmdType);

    config['devServer'] = {
      disableHostCheck: true,
      proxy: proxyJson,
    };
    config.publicPath = '/';
}

module.exports = config;