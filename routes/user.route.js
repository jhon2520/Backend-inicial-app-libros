const express = require("express");
const {createUser,loginUser,revalidateToken} = require("../controllers/user.controller")
const {check} = require("express-validator")
const validateFields = require("../middlewares/validateFields")
const validateToken = require("../middlewares/validateToken")


const userRouter = express.Router();


userRouter.post(
    "/new",
    [
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("email","El correo no tiene el formato correo").isEmail(),
        check("password","La contraseña debe tener mínimo 6 caracteres").isLength({min:6}),
        validateFields
    ],
    createUser)

userRouter.post(
    "/",
    [
        check("email","El correo no tiene el formato correo").isEmail(),
        check("password","La contraseña debe tener mínimo 6 caracteres").isLength({min:6}),
        validateFields
    ],
    loginUser);

userRouter.get("/renew",validateToken,revalidateToken)

module.exports = userRouter;