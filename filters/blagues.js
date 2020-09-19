module.exports.regex = [
    /^re[^a-zA-Z02-9\u00C0-\u017F]*$/i,
    /quoi[^a-z02-9\u00C0-\u017F]*$/i,
    /pas[^a-z02-9\u00C0-\u017F]*$/i,
    /oui[^a-z02-9\u00C0-\u017F]*$/i,
]

module.exports.exec = (str, info, funcs) => {
    if (/^re[^a-zA-Z02-9\u00C0-\u017F]*$/i.test(str)) {
        if (/^RE[^a-zA-Z02-9\u00C0-\u017F]*$/.test(str))
            funcs.answer("QUIN" + str.substring(2) + " 🦈")
        else if (/^Re[^a-zA-Z02-9\u00C0-\u017F]*$/.test(str))
            funcs.answer("Quin" + str.substring(2) + " 🦈")
        else if (/^rE[^a-zA-Z02-9\u00C0-\u017F]*$/.test(str))
            funcs.answer("quiN" + str.substring(2) + " 🦈")
        else if (/^re[^a-z02-9\u00C0-\u017F]*$/i.test(str))
            funcs.answer("quin" + str.substring(2) + " 🦈")
    } else if (Math.random() < 1 / 10) {
        if (/quoi[^a-z02-9\u00C0-\u017F]*$/i.test(str))
            funcs.answer("feur 💇")
        else if (/pas[^a-z02-9\u00C0-\u017F]*$/i.test(str))
            funcs.answer("steque 🍉")
        else if (/oui[^a-z02-9\u00C0-\u017F]*$/i.test(str))
            funcs.answer("stiti 🐒")
    }
    return 0
}
