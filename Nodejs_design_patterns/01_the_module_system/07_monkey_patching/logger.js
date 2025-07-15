class Logger{
    constructor(name) {
        this.count = 0;
        this.name = name;
    }

    log(message) {
        this.count++;
        console.log(`${this.name}'s message is: ${message}`);
    }
}

module.exports = new Logger('Danger');
module.exports.Logger = Logger;