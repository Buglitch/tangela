module.exports.alias = ["macron", "macronyme",
    "caron", "hatchek", "antiflexe", "inflexe",
    "circonflexeinversé",
    "caronyme", "hatchekonyme", "antiflexonyme", "inflexonyme",
    "circonflexeinversonyme",
    "macaron", "macaronyme",
    "ogonek", "ogonekonyme"]

module.exports.exec = (argv, info, funcs) => {
    let message
    if (/nyme$/i.test(argv[0]))
        message = info.nickname
    else if (argv.length >= 2)
        message = argv.slice(1).join(" ")
    else
        return 1

    if (/mac/i.test(argv[0]))
        message = message.split("").join("\u0304")

    if (/caron/i.test(argv[0])
        || /^hatchek/i.test(argv[0])
        || /^antiflex/i.test(argv[0])
        || /^inflex/i.test(argv[0])
        || /^circonflexeinvers/i.test(argv[0]))
        message = message.split("").join("\u030C")

    if (/^ogonek/i.test(argv[0]))
        message = message.split("").join("\u0328")

    funcs.answer(message)
    return 0
}

module.exports.usage = [
    "accent message", "acconyme",
]
