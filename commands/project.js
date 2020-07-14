module.exports.alias = ["project", "projet"]

module.exports.exec = (argv, info, funcs) => {

    const titans = [
        "Ocean", "Tethys", "Hyperion", "Theia", "Coeos", "Phoebe", "Cronos", "Rhea",
        "Mnemosyne", "Themis", "Crios", "Lapetus",
    ]
    const titan = titans[Math.floor(Math.random() * titans.length)]

    if (/^project$/i.test(argv[0]))
        funcs.answer(`#Project${titan}`)
    else
        funcs.answer(`#Projet${titan}`)

    return 0
}

module.exports.usage = [
    "project",
    "projet",
]
