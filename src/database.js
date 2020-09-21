// @src/database.js

// requirement
const Fs = require("fs")

// function
function init_db(path, id) {
    if (!Fs.existsSync(path))
        Fs.mkdirSync(path)

    const json_path = `${path}/${id}.json`
    if (!Fs.existsSync(json_path)) {
        const fd = Fs.openSync(json_path, "wx")
        Fs.writeSync(fd, JSON.stringify({}, null, 4))
        Fs.closeSync(fd)
    }

    return json_path
}

module.exports.save_db = (db_path, id, json) => {
    const path = init_db(db_path, id)
    Fs.writeFileSync(path, JSON.stringify(json, null, 4))
}

module.exports.load_db = (db_path, id) => {
    const path = init_db(db_path, id)
    return JSON.parse(Fs.readFileSync(path))
}
