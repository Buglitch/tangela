module.exports.alias = ["help"]

module.exports.exec = (argv, info, funcs, meta) => {
    const help = {
        color: parseInt(meta.config.color.substring(1), 16),
        title: "Help",
        fields: [],
        footer: {
            text: meta.config.name,
        },
        timestamp: new Date().valueOf(),
    }

    meta.commands.forEach((item, i) => {
        let value = ""
        item.usage.forEach((usage_item) => {
            value += `${meta.config.symbol}${usage_item}\n`
        })
        help.fields[i] = {
            name: item.alias.join(" | "),
            value: value,
        }
    })
    funcs.answer_embed(help)
    return 0
}

module.exports.usage = ["help"]
