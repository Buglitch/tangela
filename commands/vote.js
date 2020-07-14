module.exports.alias = ["vote", "results", "close"]

const questions_stack = []

function get_sorted_reactions(reactions, meta, rm=false) {
    const sorted_reactions = []

    reactions.forEach((reaction) => {
        let count = reaction.count
        reaction.users.forEach((user) => {
            if (user.id == meta.info.user)
                count--
        })
        sorted_reactions.push({
            emoji: reaction.emoji,
            count: count,
        })
        if (rm)
            reaction.remove(meta.info.user)
    })

    return sorted_reactions.sort((a, b) => {
        return b.count - a.count
    })
}

module.exports.exec = (argv, info, funcs, meta) => {
    // vote
    if (/^vote$/i.test(argv[0])) {
        if (argv.length < 2)
            return 1
        const emote_yes = "👍"
        const emote_no = "👎"
        funcs.react(emote_yes)
        funcs.react(emote_no)
        questions_stack.push({
            question: argv.slice(1).join(" "),
            info: info,
            funcs: funcs,
        })
        return 0
    } else if (questions_stack.length == 0) {
        return 1
    }

    // results
    if (/^results$/i.test(argv[0])) {
        const results = {
            color: parseInt(meta.config.color.substring(1), 16),
            title: "🗳️ Results",
            fields: [],
            footer: {
                text: meta.config.name,
            },
            timestamp: new Date().valueOf(),
        }
        questions_stack.forEach((item, i) => {
            results.fields[i] = {
                name: `**${i}. ${item.question}**`,
                value: "",
            }
            const sorted_reactions =
                get_sorted_reactions(item.info.reactions, meta)
            sorted_reactions.forEach((reaction) => {
                results.fields[i].value
                        += `${reaction.emoji} : ${reaction.count}\n`
            })
        })
        funcs.answer_embed(results)
        return 0
    }

    // close
    argv.shift()
    let n = NaN
    if (argv.length > 0)
        n = parseInt(argv[0])
    if (!Number.isNaN(n) && n >= questions_stack.length)
        return 1
    else if (Number.isNaN(n))
        n = questions_stack.length - 1
    const question = questions_stack[n]
    questions_stack.splice(n, 1)
    const result = {
        color: parseInt(meta.config.color.substring(1), 16),
        title: `🗳️ ${question.question}`,
        description: "",
        footer: {
            text: meta.config.name,
        },
        timestamp: new Date().valueOf(),
    }
    const sorted_reactions =
                get_sorted_reactions(question.info.reactions, meta, true)
    sorted_reactions.forEach((reaction) => {
        result.description += `${reaction.emoji} : ${reaction.count}\n`
    })
    funcs.answer_embed(result)
    return 0
}

module.exports.usage = ["vote question", "results", "close [n]"]
