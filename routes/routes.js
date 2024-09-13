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

module.exports =router