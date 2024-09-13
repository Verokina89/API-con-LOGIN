const bcryp = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()

const secret = process.env.HASH

const hashed = bcryp.hashSync(secret,10)

module.exports = hashed
