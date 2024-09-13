const jwt = require("jsonwebtoken")
const hashed = require("../config/config")
const { error } = require("console")
const e = require("express")
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