export default class Logger{
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`${this.name}: ${message}`);
    }
}
//one module can have only one export in one module the below default export will give an error duplicate export of default.
export default function print(message) {
    console.log(message);
}