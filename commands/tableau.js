module.exports.alias = ["tableau"]

module.exports.exec = (argv, info, funcs) => {
    funcs.answer("```\n"
               + "+---------+---------+---------+---------+\n"
               + "|         | Normal  | Glitch  |   A.R   |\n"
               + "+---------+---------+---------+---------+\n"
               + "| Legit   |   Oui   |   Non   |   Non   |\n"
               + "+---------+---------+---------+---------+\n"
               + "| Triche  |   Non   |   Non   |   Oui   |\n"
               + "+---------+---------+---------+---------+\n"
               + "```")
    return 0
}

module.exports.usage = [
    "tableau",
]
