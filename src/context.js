// @src/config.js

// requirement
const FS = require("fs")
const Logger = require("../lib/logger.js")
const TokenEncryption = require("../lib/token_encryption.js")

// function
module.exports.parse_config = (argv) => {
    if (argv.length < 4) {
        Logger.log("usage: npm start config password")
        return null
    }

    const config_path = `configs/${argv[2]}.json`
    const password = argv[3]
    const config = require(`../${config_path}`)

    if (typeof config.name !== "string") {
        Logger.log("error: invalid config file")
        return null
    }

    Logger.log(`bot: ${config.name}`)

    if (typeof config.token === "string") {
        Logger.log("warning: unencrypted token in config file")

        const unsafe_token = config.token

        config.token = {}
        config.token.encrypted =
            TokenEncryption.cipher(unsafe_token, password)
        config.token.encrypted_hash =
            TokenEncryption.cipher(
                TokenEncryption.hash(unsafe_token), password
            )

        FS.writeFileSync(config_path, JSON.stringify(config, null, 4),
            (err) => {
                if (err) Logger.log(err)
            }
        )

        Logger.log("warning: updated config file")
        Logger.log("warning: please restart")
        return null
    }

    const token =
        TokenEncryption.decipher(config.token.encrypted, password)
    const saved_hash =
        TokenEncryption.decipher(config.token.encrypted_hash, password)
    const real_hash =
        TokenEncryption.hash(token)

    if (saved_hash === -1 || real_hash === -1 || saved_hash !== real_hash) {
        Logger.log("password: incorrect")
        return null
    }
    Logger.log("password: correct")

    const config_obj = {
        name: config.name,
        picture: config.picture,
        symbol: config.symbol,
        color: config.color,
        token: token,
        commands: config.commands,
        filters: config.filters,
        reactions: config.reactions,
    }
    return config_obj
}

module.exports.get_context = (argv) => {
    const config = module.exports.parse_config(argv)

    Logger.log(`commands: loading commands ${config.commands}`)
    let commands = []
    config.commands.forEach((item, i) => {
        try {
            commands[i] = require(`../commands/${item}.js`)
        } catch(err) {
            Logger.err("commands", err)
            commands[i] = false
        }
    })
    commands = commands.filter(Boolean)

    Logger.log(`filters: loading filters ${config.filters}`)
    let filters = []
    config.filters.forEach((item, i) => {
        try {
            filters[i] = require(`../filters/${item}.js`)
        } catch(err) {
            Logger.err("filters", err)
            filters[i] = false
        }
    })
    filters = filters.filter(Boolean)

    const context = {
        config: config,
        commands: commands,
        filters: filters,
    }
    return context
}
