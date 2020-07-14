// @root/app.js

// requirement
const Package = require("./package.json")
const Bot = require("./src/bot.js")
const Context = require("./src/context.js")
const Logger = require("./lib/logger.js")

// function
function main(argv) {
    Logger.log(
        `Welcome to ${Package.name} ${Package.version}, ${Package.description}!`
    )
    Logger.log(`${Package.license} license, ${Package.author}\n`)

    const context = Context.get_context(argv)
    if (context === null)
        return 1
    Bot.start(context)
}

// main
main(process.argv)
