const platMap = {
    test341: {
        domain: 'http://test341.deveploment.com', // ip
        ip: 'xxx.xxx.x.xx',
        username: 'homework',
        password: 'dsds',
        sshPort: 22,
        serverPath: '/home/test341',
    },
};

module.exports = {
    platMap,
    multiPage: true,
    proxyConfig(plat) {
        const host = (platMap[plat] || {}).domain;

        return {
          '/api': {
            target: host + 'space',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '^/space': ''
            }
          },
        };
    }
};