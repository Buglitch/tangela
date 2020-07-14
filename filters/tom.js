module.exports.regex = [/bite/gi]

module.exports.exec = (str, info, funcs) => {
    if (Math.random() < 0.25)
        funcs.answer("Tom : Oui ?")
    return 0
}
