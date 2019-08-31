const chalk = require('chalk');

const log = (...arg) => console.log(chalk.blue(...arg)); // eslint-disable-line

module.exports = {
    info: info => log(`${chalk.bgGreen.black('DDTOOL')} ${info}`),
    warn: info => log(`${chalk.bgRed.white('DDTOOL')} ${info}`),
    success: info => log(`${chalk.bgBlue.black('DDTOOL')} ${info}`),
};
