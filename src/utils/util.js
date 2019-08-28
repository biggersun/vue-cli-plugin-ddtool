const execa = require('execa');
const chalk = require('chalk');

const log = (...arg) => console.log(chalk.blue(...arg)); // eslint-disable-line

const execAsync = async command => {
    let res;

    try {
        res = await execa.command(command, { stdio: 'inherit' });
    } catch (error) {
        log(chalk.red(error));
        return undefined;
    }

    const { stdout } = res;
    log(stdout);

    return res;
};

function getCustomerArgsString(args) {
    const customerArgs = ['full', 'pages'];
    let argsString = '';

    Object.keys(args).forEach(key => {
        if (customerArgs.includes(key)) {
            argsString += ` --${key} ${args[key]}`;
        }
    });

    return argsString;
}

module.exports = {
    execAsync,
    log,
    getCustomerArgsString,
};
