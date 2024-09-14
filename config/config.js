const bcryp = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()

const secret = process.env.HASH

const hashed = bcryp.hashSync(secret,10)

module.exports = hashed



/*--->
/*
.env -->   Este archivo contendrá las variables sensibles como el secreto para la sesión y el puerto del servidor.
PORT=3000
SESSION_SECRET=mi_secreto_seguro
------------------------------------------------------


Se definen variables globales y configuraciones que se utilizarán en toda la aplicación, como el puerto y el secreto de sesión.

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET
};

<---*/