module.exports.alias = ["echo", "here"]

let echo_func = false

module.exports.exec = (argv, info, funcs) => {
    if (/here/i.test(argv[0])) {
        echo_func = funcs.answer
        funcs.delete()
        return 0
    }
    argv.shift()
    if (!echo_func || argv.lenght <= 0)
        return 1
    echo_func(argv.join(" "))
    return 0
}

module.exports.usage = [
    "echo msg", "here",
]
