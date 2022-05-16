const {response} = require("express");
const jwt = require("jsonwebtoken")
const {appConfig} = require("../config")



const validateToken = (req,res = response,next)=>{

    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"Debe enviar un token en la petición"
        })
    }

    try {
        
        const payload = jwt.verify(token,appConfig.secretSeedJWT);
        
        req.uid = payload.uid;
        req.name = payload.name

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg:"Token no valido"
        })
    }


    next()
}


module.exports = validateToken