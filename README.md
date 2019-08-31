# vue-cli-plugin-ddtool

[![NPM](https://nodei.co/npm/vue-cli-plugin-ddtool.png)](https://nodei.co/npm/vue-cli-plugin-ddtool/) [![License status](https://img.shields.io/github/license/biggersun/vue-cli-plugin-ddtool.svg)](https://github.com/biggersun/vue-cli-plugin-ddtool/blob/master/LICENSE) [![npm package](https://img.shields.io/npm/v/vue-cli-plugin-ddtool.svg)](https://npmjs.com/vue-cli-plugin-ddtool) [![NPM downloads](https://img.shields.io/npm/dt/vue-cli-plugin-ddtool.svg)](http://npmjs.com/vue-cli-plugin-ddtool)

## usage

```bash
# 安装包
npm install vue-cli-plugin-ddtool -D
# 启动本地开发
vue-cli-service dev --env=test341
# 发布开发服务器
vue-cli-service deploy --env=test341
```

### cli
```bash
  Usage: vue-cli-service dev [options]

  Options:

    --env     环境设置和 platmap 的 key 对应(development service proxy address)
    --pages   多页模式下增量启动开发服务配置(development pages name --pages page1,page2,page3)
    --full    多页模式下强制使用全量,会启动所有的页面(do not use incremental development)

  Usage: vue-cli-service deploy [options]

  Options:

    --env     环境设置和 platmap 的 key 对应(deploy service key)
    --pages   多页模式下增量启动开发服务配置(deploy pages name page1,page2,page3)
    --full    多页模式下强制使用全量,会启动所有的页面(do not use incremental deploy)
```

### `ddtool.js` 配置文件

示例配置：

```javascript
// ddtool.js
module.exports = {
    platMap: {
        test341: {
            domain: 'http://test341.deveploment.com',
            ip: 'xxx.xxx.x.xx',
            username: 'xxx',
            password: 'xxxxxx',
            sshPort: 22,
            serverPath: '/home/test341',
        },
    },
    // 可选配置
    proxyConfig: (env: keyof platMap) => {
        // 通过 env 获取 proxy host 动态配置本地开发 api 代理
        // return webpack-dev-server-proxy-config;
    },
};
```

```javascript
// vue.config.js
const { proxyConfig } = require('ddtool');

module.exports = {
    devServer: {
        proxy: proxyConfig(process.env.NODE_ENV),
    },
};
```

`platMap`: 正常我们开发时的开发服务器代理配置 `map`,可以配置代理域名，用于启动开发代理，还可以配置测试服务器的`IP地址`、`ssh` (端口默认为 `22`)、发布地址 serverPath。

`proxyConfig`: 返回一个 [webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy) 的 `proxy config` 对象，也可以返回一个返回对象的函数。

## Options

```typescript
// ddtool.js

// 多页应用配置
module.exports = {
    multiPage: true,
    pages: glob  = './src/modules/*',
    // 页面入口 相对pages路径
    pagesEntry: glob = './main.js',
    // 页面模板 相对pages路径
    pagesTemplate: glob = './index.{pug,html}',
    // git主分支 用于增量更新,默认会自动根据git diff 启动增量服务
    mainBranch: string = 'master',
}
```

## 🔗 Links

-   [Example](https://github.com/biggersun/vue-cli-plugin-ddtool/tree/master/example)
-   [Vue CLI3](https://cli.vuejs.org/zh/guide/)
