module.exports.alias = ["flandre"]

module.exports.exec = (argv, info, funcs) => {
    argv.shift()
    if (argv.length > 0) {
        argv.forEach((item) => {
            funcs.answer_embed({ image: { url: `https://www.prama-initiative.com/uploads/flandre/${item}.gif` } })
        })
    } else {
        return 1
    }
    return 0
}

module.exports.usage = ["flandre gif1 [gifs]..."]
