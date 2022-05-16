const {dbConfig} = require("../config")
const {dbConn} = dbConfig;
const mongoose = require("mongoose")

const dbConnection = async()=>{

    try {
        
        await mongoose.connect(dbConn)
        console.log("Db online connected");

    } catch (error) {
        console.log(error);
        throw new Error("No se pudo iniciar la conexión")
    }
}

module.exports = dbConnection;
