const mongoose = require("mongoose")



const BookSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },    
    // debo crear la referencia al usuario que crea el libro
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


},{
    timestamps:true
})


const BookModel = mongoose.model("Book",BookSchema);

module.exports = BookModel;