const exec = require('child_process').exec;
const yargs = require('yargs-parser');
const client = require('scp2');
const chalk = require('chalk');
const { platMap } = require('../config/proxyConfig');

if (!client) {
    throw Error('请先安装scp2 ==> npm run scp2 -g');
}

const argvs = yargs(process.argv);
const log = res => console.log(chalk.green(res));

const execAsync = (command, encodeType = 'utf8') => {
    return new Promise((resolve, reject) => {
        exec(command, encodeType, (err, stdout, stderr) => {
            if (err) {
                log(chalk.red('err:', err));
                log(chalk.red('stderr:', stderr));
                reject(err, stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

// 获取git改动清单
const getArrList = (str, type) => {
  const fix = 'src\/module\/(\\w*)/\(\\w*).[vue,pug,js]';
  const arr = str.split('\n')

  return arr.map(item => {
    const regex = new RegExp(`^${type}\\t${fix}`)
    if (regex.test(item)) {
      return RegExp.$1;
    }
    return undefined;
  }).filter(item => item);
}

let now = Date.now();
const gitCommand = 'git diff --name-status origin/dev'
let arr = [];
log(chalk.blue('>>>正在diff'));
execAsync(gitCommand)
.then((stdout) => {
    const typeList = ['M', 'A'];
    typeList.forEach(type => {
        arr = arr.concat(getArrList(stdout, type));
    });

    log(chalk.green('更新文件:'));
    log(arr.join('\n'));
    log(chalk.blue('>>>正在build'));

    if (arr && arr.length > 0) {
        const buildCommand = `npm run build ${arr.join(',')} -- --nooptimize`;
        return execAsync(buildCommand);
    } else {
        throw new Error('没有文件更新');
    }
})
.then((stdout) => {
    log(chalk.blue('>>>正在upload'));
    if (!typeof argvs.env === 'string') {
        log(chalk.red(`
            env 无效
            请使用 node tools/buildChunk.js --env=[your env]
        `));
    }

    const plat = platMap[argvs.env];

    return new Promise((resolve, reject) => {
        client.scp('dist/', {
            host: plat.offlineDomain,
            port: plat.sshPort || 22,
            username: 'homework',
            password: 'MhxzKhl',
            path: plat.serverPath
        }, (err) => {
            if (err) {
                log(chalk.red('>>>发布失败'));
                reject(err);
            } else {
                log(chalk.blue('>>>发布成功'));
                resolve();
            }
            console.log(chalk.green(`耗费时间:${Date.now() - now}ms`));
        })
    });
})
.catch((err) => {
    log(err.message);
});
