const express = require("express")
const axios = require("axios")
const configHashed = require("./config/config")
const session = require("express-session")
const dotenv = require("dotenv")
const routes = require("./routes/routes")

dotenv.config()
const app = express()

const PORT = process.env.PORT ?? 4000

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
    console.log(`Server listening on port http://localhost:${PORT}/`);
    
})

/*---> 
app.js
Este es el archivo principal que levantará el servidor y conectará todas las rutas y middlewares.

const express = require('express');
const session = require('express-session');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/routes');
const app = express();

// Middleware para manejar datos de formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de la sesión
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Rutas de autenticación
app.use('/', userRoutes);

// Rutas protegidas de la API
app.use('/', apiRoutes);

// Iniciar el servidor
app.listen(PORT,(req,res) =>  {
    console.log(`Server listening on port http://localhost:${PORT}/`);
    
})
<---*/