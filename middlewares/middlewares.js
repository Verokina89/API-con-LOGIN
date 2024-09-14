const jwt = require("jsonwebtoken")
const hashed = require("../config/config")
const { error } = require("console")
const express = require("express")

const tokenGenerator = (user) => {
    
    return jwt.sign({userID:user.id,username : user.username},hashed,{expiresIn : "1h"})

}
const userAuth = (req,res,next) => {
    const userToken = req.session.token
    jwt.verify(userToken,hashed,(error,decoded) => {
        if (error) {
            res.status(500).json({message : "Token Invalid"})
        }else{
           
            
            req.user = decoded.userID
            next()
        }
    })
    
}
module.exports = {
    tokenGenerator,
    userAuth
}


/*--->
Middleware para proteger las rutas asegurando la autenticacion del  usuario.

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next(); // Si el usuario está autenticado, continúa
  } else {
    res.redirect('/'); // Si no está autenticado, redirige al login
  }
};

module.exports = { isAuthenticated };
<---*/