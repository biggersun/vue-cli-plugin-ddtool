# vue-cli-plugin-ddtool

## usage

```bash
# 启动本地开发
vue-cli-service dev --env=test341
# 发布开发服务器
vue-cli-service deploy --env=test341
```

### `ddtool.js` 配置文件

示例配置：

```javascript
// ddtool.js
module.exports = {
    platMap: {
        test341: {
            domain: 'http://test341.deveploment.com', // ip
            ip: 'xxx.xxx.x.xx',
            sshPort: 22,
            deployPath: '/home/test341',
        },
    },
    proxyConfig: {
        // webpack-dev-server proxy config
    },
};
```

`platMap`: 正常我们开发时的开发服务器代理配置 `map`,可以配置代理域名，用于启动开发代理，还可以配置测试服务器的`IP地址`、`ssh` (端口默认为 `22`)、发布地址 serverPath。

`proxyConfig`: 返回一个 [webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy) 的 `proxy config` 对象，也可以返回一个返回对象的函数。
