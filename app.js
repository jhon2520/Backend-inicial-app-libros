const express = require("express")
const userRouter = require("./routes/user.route")
const bookRouter = require("./routes/book.route")

const app = express();

app.use(express.static("public"))
app.use(express.json())
app.use("/api/users",userRouter)
app.use("/api/books",bookRouter)



module.exports = app;


