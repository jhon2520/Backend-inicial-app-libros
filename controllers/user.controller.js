const UserModel = require("../models/user.model")
const {response} = require("express");
const bcrypt = require("bcrypt")
const generarJWT = require("../helpers/jwt")





const createUser = async(req,res = response)=>{

    const {name,email,password} = req.body
    

    //validar que el usuario no exista
    const user = await UserModel.findOne({email:email})
    if(user){
        return res.status(400).json({
            ok:false,
            msg:"El usuario ya se encuentra registrado"
        })
    }

    try {
        
        const newUser = UserModel(req.body)
        
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password,salt)

        
        const savedUser = await newUser.save();
        
        //crear token
        const token = await generarJWT(savedUser.id,savedUser.name);


        return res.status(200).json({
            ok:true,
            savedUser,
            token
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Por favor contacte al administrador"
        })
    }
}


const loginUser = async(req,res)=>{

    const {email,password} = req.body

    try {

        const user = await UserModel.findOne({email:email})

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"No se encuentra un usuario registrado con ese correo"
            })
        }

        //validar contraseña encriptada
        const validPassword = bcrypt.compareSync(password,user.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"Contraseña no válida"
            })
        }

        //generar token
        const token = await  generarJWT(user.id,user.name)

        return res.status(200).json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })


        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Consulte con el administador"
        })
    }
}

const revalidateToken = async(req,res)=>{

    const{uid,name} = req.body

    const token = await generarJWT(uid,name)
    
    return res.status(200).json({
        ok:true,
        token
    })

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}