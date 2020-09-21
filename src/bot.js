// @src/bot.js

// requirement
const Client = require("../src/client.js")
const Logger = require("../lib/logger.js")

// function
module.exports.start = (context) => {
    Client.init(context, () => {
        Logger.log("logged in")
    })

    Client.loop(context, (str, info, funcs) => {
        // commands
        const symbol = context.config.symbol.trim()
        if (str.substring(0, symbol.length) === symbol) {
            str = str.replace(symbol, "")
            str = str.trim()
            const argv = str.split(" ")
            context.commands.some((v) => {
                if (v.alias.includes(argv[0].toLowerCase())) {
                    const react = context.config.reactions[
                        v.exec(argv, info, funcs, context)
                    ]
                    if (react && react !== "")
                        funcs.react(react)
                    return true
                }
                return false
            })
        }
        // filters
        context.filters.some((v) => {
            for (const r of v.regex) {
                if (r.test(str)) {
                    const react = context.config.reactions[
                        v.exec(str, info, funcs)
                    ]
                    if (react && react !== "")
                        funcs.react(react)
                }
            }
        })
    })
}
