module.exports.alias = ["choose"]

module.exports.exec = (argv, info, funcs) => {
    argv.shift()
    if (argv.length != 0)
        funcs.answer(`📋 ${argv[Math.floor(Math.random() * argv.length)]}`)
    else
        return 1
    return 0
}

module.exports.usage = ["choose item1 [items]..."]
