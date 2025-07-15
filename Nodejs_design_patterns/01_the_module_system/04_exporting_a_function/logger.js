module.exports = (message) => {
    console.log(`This is a test message.`)
}

module.exports = (other_message) => {
    console.log(`Other message function is invoked.`);
}

module.exports.verbose = (message) => {
    console.log(`verbose: ${message}`);
}

function message() {
    console.log(`This is from the message() function.`);
}