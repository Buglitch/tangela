// @src/client.js

// requirement
const Discord = require("discord.js")
const Logger = require("../lib/logger.js")

// constant
const client = new Discord.Client()

// function
module.exports.init = (context, fun) => {
    const config = context.config
    client.login(config.token)
    client.on("ready", () => {
        if (client.user.username !== config.name)
            client.user.setUsername(config.name).catch(Logger.catch("username"))

        client.user.setAvatar(`img/${config.picture}`)
            .catch(Logger.catch("avatar"))

        client.user.setPresence({ status: "online" })
            .catch(Logger.catch("presence"))

        context.info = {
            user: client.user.id,
        }

        fun()
    })
}

module.exports.loop = (fun) => {
    client.on("message", (msg) => {
        // raw message
        const str = msg.content
        // info object
        const info = {
            author: msg.author.id,
            bot: client.user.id,
            channel: msg.channel.id,
            message: msg.id,
            server: msg.channel.guild.id,
            reactions: msg.reactions,
            nickname: (msg.member.nickname)
                ? msg.member.nickname : msg.author.username,
            username: msg.author.username,
        }
        // function object
        const funcs = {
            answer: (str) =>
                msg.channel.send(str)
                    .catch(Logger.catch("answer")),

            answer_embed: (embed) =>
                msg.channel.send({ embed: embed })
                    .catch(Logger.catch("answer_embed")),

            answer_file: (str, file, name) =>
                msg.channel.send(
                    str, file ? new Discord.Attachment(file, name) : null
                ).catch(Logger.catch("answer_file")),

            delete: () =>
                msg.delete(),

            react: (reaction) =>
                msg.react(reaction)
                    .catch(Logger.catch("react")),
        }

        fun(str, info, funcs)
    })
}
