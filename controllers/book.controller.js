const BookModel = require("../models/book.model")
const {response} = require("express")


const createBook = async(req,res = response)=>{

    const {name} = req.body

    // validar que el libro no exista
    const newBook = await BookModel.findOne({name:name})
    if(newBook){
        return res.status(400).json({
            ok:false,
            msg:"El libro ya se encuentra registrado en la base de datos"
        })
    }

    try {


        const book = new BookModel(req.body);
        book.user = req.uid

        const bookSaved = await book.save();


        console.log(book);


        return res.status(200).json({
            ok:true,
            bookSaved
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Contante con el administrador"
        })
    }

}


const getBooks = async(req,res = response)=>{

    try {
        
        const books = await BookModel.find().populate("user","email");

        return res.status(200).json({
            ok:true,
            books,
        })

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok:false,
            msg:"Contante con el administrador"
        })
    }    
}

const getBook = async(req,res)=>{

    const {id} = req.params


    const book = await BookModel.findOne({_id:id.toString()});

    if(!book){
        return res.status(200).json({
            ok:false,
            msg:"El libro no se encuentra registrado"
        })
    }


    return res.status(200).json({
        ok:true,
        book
    })

}


const updateBook = async(req,res)=>{

    const {id} = req.params;

    const book = await BookModel.findOne({_id:id})
    // console.log("actual", book);

    if(!book){
        return res.status(400).json({
            ok:false,
            msg:"No se encoentró el libro en la base de datos"
        })
    }
    try {
        
        const newBook = req.body
        // console.log("nuevo",newBook);
        Object.assign(book,newBook)

        const newSavedBook = await book.save();

    
        return res.status(200).json({
            ok:true,
            newSavedBook
        })


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Contante con el administrador"
        })
    }

}

const deleteBook = async(req,res)=>{

    const {id} = req.params;
    const book = await BookModel.findOne({_id:id});

    if(!book){
        return res.status(400).json({
            ok:false,
            msg:"No se encoentró el libro que se desea elimianr"
        })
    }

    const bookDeleted = await book.remove();

    return res.status(200).json({
        ok:true,
        bookDeleted
    })


}

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}