// @lib/logger.js

// function
module.exports.log = (str) => {
    process.stdout.write(`${str}\n`)
}

module.exports.err = (str, err) => {
    process.stderr.write(`${str}: ${err}\n`)
}

module.exports.catch = (str) => {
    return (err) => {
        this.err(str, err)
    }
}
