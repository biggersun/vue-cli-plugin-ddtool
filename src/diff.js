const glob = require('glob');
const { exec } = require('child_process');
const { getSources } = require('./tools');

const execAsync = (command, encodeType = 'utf8') => {
    return new Promise((resolve, reject) => {
        exec(command, encodeType, (err, stdout, stderr) => {
            if (err) {
                reject(err, stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

// 获取git diff 文件
async function getGitDiff(mainBranch) {
    const typeList = ['M', 'A'];
    const gitCommand = `git diff --name-status ${mainBranch}`;
    const diffStr = await execAsync(gitCommand);

    const diffItems = diffStr
        .split('\n')
        .filter(item => typeList.findIndex(type => new RegExp(type).test(item)) > -1 && item.split('/').length > 1)
        .map(item => {
            let res = item.slice(2);
            res = res.split('/');
            res.pop();
            return res.join('/');
        });

    return new Set(diffItems);
}

async function getPagesArgvFromGit(config) {
    const { mainBranch, pages } = config;
    const diffInfo = await getGitDiff(mainBranch);
    let pagesFolders = glob.sync(getSources(pages));
    pagesFolders = pagesFolders
        .filter(page => {
            let isInclude = false;
            diffInfo.forEach(item => {
                if (new RegExp(item).test(page)) {
                    isInclude = true;
                }
            });
            return isInclude;
        })
        .map(item => item.split('/').slice(-1)[0]);

    return pagesFolders;
}

module.exports = {
    getGitDiff,
    getPagesArgvFromGit,
};
