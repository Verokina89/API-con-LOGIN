const express = require("express")
const users = require("../users/users.js")
const router = express.Router()
const {tokenGenerator,userAuth} = require("../middlewares/middlewares")
const { default: axios } = require("axios")
const urlBase = 'https://rickandmortyapi.com/api/character'

router.get("/",(req,res) => {
    const isUserLogged = req.session.token
    
    if (!isUserLogged) {
        const template = `
        <form action="/login" method="post">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required><br>
    
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>
    
        <button type="submit">Iniciar sesión</button>
      </form>
        `
        res.send(template)
        
    }else{
        res.redirect("/search")
    }
    
    
})
router.post("/login",(req,res) => {
    const {username,password} = req.body
    const findIndex = users.findIndex(user => user.username === username && user.password === password)
    
    
    
    if (findIndex === -1) {
        res.status(404).json({message:"⚠️ Users does not exist ⚠️"})
    }else{
        
        const token = tokenGenerator(users[findIndex])
        req.session.token = token
        res.redirect("/search")
        
    }
    
})

router.get("/search",userAuth,(req,res) => {
    const template =  `
        
        <form method="post" action="/search">
        <label for="inputName">Search Character</label>
        <input id="inputName" type="text" placeholder="Rick" required name="characterName" /> 
        <button type="submit">Search</button>
        </form>

        <a href="/logout"> <button>Logout</button> </a>

        `
    res.send(template)
    
})
router.post("/search",async(req,res) => {
    const isUserLogged = req.session.token
    const characterName = req.body.characterName.toLowerCase().trim()
   
   try {
    if (!isUserLogged) {
        res.redirect("/")
    }else{
       
       const response = await axios.get(`${urlBase}/?name=${characterName}&`)
       const data = await response.data.results
       const characters = data.map(character => {
           const {name,status,species,type,gender,image,origin:{name:originName}} = character
           const template = 
               `
               <h1> <span> Name:</span> ${name} </h1>
               <img src="${image}" alt"${name}">
               <p> <span>Status:</span> ${status}</p>
               <p> <span>Species:</span> ${species}</p>
               <p> <span>Type:</span> ${type}</p>
               <p> <span>Gender:</span> ${gender}</p>
               <p><span>Origin:</span> ${originName}</p>
               `
           return template
       }).join('')
       
      
       res.send(`<a href="/logout"> <button>Logout</button> </a> ${characters}`)
       
    }  
   } catch (error) {
     console.error(error.message);
     
   } 
    
    
})

router.get("/character",async(req,res)=>{
    const isUserLogged = req.session.token

   try {

    if (!isUserLogged) {
        res.status(401).json({message: "⚠️ Token Invalid ⚠️"})
    }else{
        const response = await axios.get(urlBase)
        const data = await response.data
        res.json(data)
    }
    
   } catch (error) {
    console.error(error.message);
   }
})

router.get("/logout",(req,res) => {
    req.session.destroy()
    res.redirect("/")
})

router.use((req,res) => {
    res.send("⚠️ Page not found ⚠️")
})

module.exports = router

/*---> 
routes/routes.js (este es un archivo)
Aquí definimos las rutas protegidas para acceder a la API de Rick and Morty.

const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const axios = require('axios');
const router = express.Router();

// Ruta para la búsqueda de personajes
router.get('/search', isAuthenticated, (req, res) => {
  res.send(`
    <form action="/character" method="GET">
      <label>Nombre del personaje:</label>
      <input type="text" name="name" required />
      <button type="submit">Buscar</button>
    </form>
    <form action="/logout" method="POST">
      <button type="submit">Logout</button>
    </form>
  `);
});

// Ruta para obtener un personaje por nombre
router.get('/character', isAuthenticated, async (req, res) => {
  const name = req.query.name;
  
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const character = response.data.results[0];

    res.send(`
      <h1>${character.name}</h1>
      <img src="${character.image}" alt="${character.name}" />
      <p>Género: ${character.gender}</p>
      <p>Estado: ${character.status}</p>
      <a href="/search">Buscar otro personaje</a>
    `);
  } catch (error) {
    res.send('Personaje no encontrado.');
  }
});

module.exports = router;

----------------------------------------------------
routes/userRoutes.js (otro archivo en esta carpeta)
Estas rutas manejarán el proceso de autenticación de usuarios.

const express = require('express');
const bcrypt = require('bcryptjs');
const users = require('../users/users');
const router = express.Router();

// Ruta para login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(401).send('Usuario no encontrado');
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Contraseña incorrecta');

  req.session.user = user; // Guarda el usuario en la sesión
  res.redirect('/search');
});

// Ruta para logout
router.post('/logout', (req, res) => {
  req.session.destroy(); // Destruye la sesión
  res.redirect('/');
});

module.exports = router;
<---*/