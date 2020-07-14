// @lib/token_encryption.js

// requirement
const Crypto = require("crypto")

// constant
const c_algorithm = "aes256"
const k_algorithm = "sha256"
const h_algorithm = "md5"

const resizedIV = Buffer.allocUnsafe(16)
const iv = Crypto.createHash(k_algorithm).update("iv").digest()
iv.copy(resizedIV)

// function
module.exports.cipher = (string, key) => {
    try {
        const k = Crypto.createHash(k_algorithm).update(key).digest()
        const cipher = Crypto.createCipheriv(c_algorithm, k, resizedIV)

        const msg =
            cipher.update(string, "binary", "hex") + cipher.final("hex")
        return msg

    } catch (error) {
        return -1
    }
}

module.exports.decipher = (string, key) => {
    try {
        const k = Crypto.createHash(k_algorithm).update(key).digest()
        const decipher = Crypto.createDecipheriv(c_algorithm, k, resizedIV)

        const msg =
            decipher.update(string, "hex", "binary") + decipher.final("binary")
        return msg

    } catch (error) {
        return -1
    }
}

module.exports.hash = (string) => {
    try {
        const h = Crypto.createHash(h_algorithm)
        return h.update(string).digest("hex")
    } catch (error) {
        return -1
    }
}
