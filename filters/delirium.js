module.exports.regex = [/delirium(?!noù)/gi]

module.exports.exec = (str, info, funcs) => {
    if (/#delirium/gi.test(str))
        return 0
    str = str.replace(/AU\sDELIRIUM(?!NOÙ)/g, "À LA PDT")
    str = str.replace(/LE\sDELIRIUM(?!NOÙ)/g, "LA PDT")
    str = str.replace(/DU\sDELIRIUM(?!NOÙ)/g, "DE LA PDT")
    str = str.replace(/DELIRIUM(?!NOÙ)/g, "PDT")
    str = str.replace(/au\sdelirium(?!noù)/ig, "à la pdt")
    str = str.replace(/le\sdelirium(?!noù)/ig, "la pdt")
    str = str.replace(/du\sdelirium(?!noù)/ig, "de la pdt")
    str = str.replace(/delirium(?!noù)/ig, "pdt")
    funcs.delete()
    funcs.answer(`<@${info.author}>: ${str}`)
    return 0
}
