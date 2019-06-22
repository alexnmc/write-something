const express = require('express')
const app = express()
require ('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require("express-jwt");
const path = require("path")
const PORT = process.env.PORT || 8000
const secret = process.env.SECRET || "some secret passphrase here for local development"



app.use(express.json()) 
app.use(morgan('dev'))  
app.use("/api", expressJwt({secret})) //req.user === {username, password, _id}
app.use(express.static(path.join(__dirname, "client", "build")))



app.use("/user", require("./routes/user"))
app.use("/notes", require("./routes/notes"))



mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/practice', {useNewUrlParser: true}, () => {
    console.log('connect to the db captain!')    // name of database is version3
})
mongoose.set('useCreateIndex', true); // stops the error message...



app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        
        res.status(err.status); //secret error 
    }
    return res.send({errMsg: err.message})
})




app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT} sir!`)
})
