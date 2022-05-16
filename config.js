const config ={
    appConfig :{
        port:process.env.PORT,
        secretSeedJWT:process.env.SECRET_JWT_SEED
    },
    dbConfig:{
        dbConn : process.env.DB_CNN
    }
}

module.exports = config;