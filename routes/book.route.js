const express = require("express")
const {createBook,getBooks,getBook,updateBook,deleteBook} = require("../controllers/book.controller")
const {check} = require("express-validator") 
const validateFields = require("../middlewares/validateFields")
const validateToken = require("../middlewares/validateToken")

const bookRouter = express.Router();

bookRouter.use(validateToken)

bookRouter.post(
    "/new",
    [
        check("name","El nombre del libro es obligatorio").not().isEmpty(),
        check("author","El nombre del autor es obligatorio").not().isEmpty(),
        check("score","el score no puede ser menor o igual a cero").isLength({min:1}),
        validateFields
    ]
    ,
    createBook);

bookRouter.get("/", getBooks);

bookRouter.get("/:id", getBook);

bookRouter.put(
    "/:id", 
    [
        check("name","El nombre del libro es obligatorio").not().isEmpty(),
        check("author","El nombre del autor es obligatorio").not().isEmpty(),
        check("score","el score no puede ser menor o igual a cero").isLength({min:1}),
        validateFields
    ]
    ,updateBook);


bookRouter.delete("/:id",deleteBook)


module.exports = bookRouter;