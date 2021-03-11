import chalk from 'chalk';
import moment from 'moment-timezone';
import { Console } from 'console';

class Logger extends Console {
    constructor(opts) {
        super({ stdout: process.stdout, stderr: process.stderr });

        // The pad end length for each log message
        this.padEndLength = parseInt(process.env.PAD_END_MESSAGE, 10);
    }

    // return the message with defined length
    padEndMessage(message) {
        return message.padEnd(this.padEndLength, '.');
    }

    // Logging information
    info(message, color = 'white') {
        const log = this.padEndMessage(`${chalk.cyan(`[Info - ${this.getTime()}]`)} ${chalk[color](message)}`);
        process.stdout.write(log + '\n');
    }

    // Show success status in green
    success(message = '', color = 'greenBright') {
        const log = this.padEndMessage(`${chalk.green(`[Success - ${this.getTime()}]`)} ${chalk[color](message)}`);
        process.stdout.write(log + '\n');
    }

    // Show the error warning in red
    fail(message = '', color = 'redBright') {
        const log = this.padEndMessage(`${chalk.red(`[Error - ${this.getTime()}]`)} ${chalk[color](message)}`);
        process.stdout.write(log + '\n');
    }

    getTime() {
        return moment(new Date()).format('HH:mm:ss DD/MM')
    }
};

// init Logger
export const logger = new Logger();
