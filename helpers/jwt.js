const jwt = require("jsonwebtoken");
const {appConfig} = require("../config")


const generarJWT =(uid,name)=>{

    const promise = new Promise((resolve,reject)=>{

        const payload ={
            uid,
            name
        }

        jwt.sign(payload,appConfig.secretSeedJWT,{
            expiresIn:"5h"
        },(err,token)=>{

            if(err){
                console.log(err);
                reject("No se puedo genera el token")
            }

            resolve(token)
        })

    });

    return promise;

}

module.exports = generarJWT;