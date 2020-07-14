module.exports.alias = ["picture"]

module.exports.exec = (argv, info, funcs) => {
    let type = "default"
    if (argv.length > 1)
        type = argv[1].toLowerCase()
    switch (type) {
    case "%":
        funcs.answer_file("", "https://r.sine.com/index", "random.gif")
        break
    default:
        funcs.answer_file("", "https://picsum.photos/0", "random.jpg")
    }
    return 3
}

module.exports.usage = [
    "picture [type]",
]
