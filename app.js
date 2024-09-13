const express = require("express")
const axios = require("axios")
const configHashed = require("./config/config")
const session = require("express-session")
const dotenv = require("dotenv")
const routes = require("./routes/routes")

dotenv.config()
const app = express()

const PORT = process.env.PORT ?? 3500
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(session({
    secret: configHashed,
    resave: "false",
    saveUninitialized: true,
    cookie:{secure:false}
}))


app.use(routes)

app.listen(PORT,(req,res) =>  {
    console.log(`Server listening on port ${PORT}`);
    
})