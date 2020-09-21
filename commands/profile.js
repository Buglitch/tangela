module.exports.alias = ["profile", "score"]

function display_profile(id, info, funcs, meta) {
    const user_info = funcs.get_user_info(id)
    if (!user_info)
        return 1

    const profile = {
        color: parseInt(meta.config.color.substring(1), 16),
        thumbnail: {
            url: user_info.avatar,
        },
        title: user_info.username,
        fields: [],
        footer: {
            text: meta.config.name,
        },
        timestamp: new Date().valueOf(),
    }

    const user_data = funcs.load_db(id)

    Object.entries(user_data).forEach(([key, value]) => {
        profile.fields.push({
            name: key,
            value: value,
        })
    })

    funcs.answer_embed(profile)
    return 0
}

module.exports.exec = (argv, info, funcs, meta) => {
    if (/^profile$/i.test(argv[0])) {
        if (argv.length >= 2 && /^<@![0-9]+>$/.test(argv[1])) {
            return display_profile(
                argv[1].substring(3, argv[1].length - 1), info, funcs, meta
            )
        }
        return display_profile(info.author, info, funcs, meta)
    }

    if (argv.length == 2) {
        const key = argv[1].toUpperCase()
        const user_data = funcs.load_db(info.author)
        if (user_data[key])
            user_data[key] += 1
        else
            user_data[key] = 1
        funcs.save_db(info.author, user_data)
        return 3
    } else if (argv.length >= 3) {
        const key = argv[1].toUpperCase()
        if (!/^-?\d+$/.test(argv[2]))
            return 1
        const user_data = funcs.load_db(info.author)
        if (user_data[key])
            user_data[key] += parseInt(argv[2])
        else
            user_data[key] = parseInt(argv[2])
        if (user_data[key] === 0)
            delete user_data[key]
        funcs.save_db(info.author, user_data)
        return 3
    }

    return 1
}

module.exports.usage = [
    "profile [@user]", "score name [amount]",
]
