module.exports.alias = ["roll"]

module.exports.exec = (argv, info, funcs) => {
    argv.shift()
    let min = 0
    let max = 100
    if (argv.length == 1) {
        min = 1
        max = parseInt(argv[0])
    } else if (argv.length >= 2) {
        min = parseInt(argv[0])
        max = parseInt(argv[1])
    }
    if (Number.isNaN(min) || Number.isNaN(max) || min > max)
        return 1
    funcs.answer(`🎲 ${Math.floor(Math.random() * (max - min + 1)) + min}`)
    return 0
}

module.exports.usage = [
    "roll (0 -> 100)", "roll [min] max",
]
