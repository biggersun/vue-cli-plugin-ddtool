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
    proxyConfig(plat) {
        const host = platMap[plat].domain;
        console.log(host);

        return {
          '/api': {
            target: host + 'parentactivity',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '^/parentactivity': ''
            }
          },
        };
    }
};