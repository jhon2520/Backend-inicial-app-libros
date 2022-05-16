require("dotenv").config()
const {appConfig} = require("./config")
const {port} = appConfig
const dbConnection = require("./DB/dbCondig") 
const app = require("./app")

//app.use(express.static("public"))

const initApp = ()=>{
    try {
        
        dbConnection();
        app.listen(port,()=>{
            console.log(`Listen on ${port}`);
        })
        
    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}


initApp();