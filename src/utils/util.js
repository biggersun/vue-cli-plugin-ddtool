const execa = require('execa');
const chalk = require('chalk');

const log = (...arg) => console.log(chalk.blue(...arg));

const execAsync = async (command) => {
    let res;
    try {
        res = await execa.command(command, { stdio: 'inherit' });
    } catch (error) {
        log(chalk.red(error));
        return;
    }
    const { stdout } = res;
    log(stdout);
}

module.exports = {
    execAsync,
    log,
};
