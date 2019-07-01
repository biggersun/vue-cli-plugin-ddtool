const chalk = require('chalk');

const log = (...arg) => console.log(chalk.blue(...arg)); // eslint-disable-line

module.exports = {
    info: info => log(`${chalk.bgGreen.white('DDTOOL')} ${info}`),
    warn: info => log(`${chalk.bgRed.white('DDTOOL')} ${info}`),
    success: info => log(`${chalk.bgBlue.white('DDTOOL')} ${info}`),
};
