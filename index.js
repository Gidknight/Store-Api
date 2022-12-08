require('dotenv').config()
const express = require("express")
const app = express()
const connectDB = require('./db/connect')
const store = require("./routes/store")
const port = process.env.PORT || 5500

//middleware
app.use(express.json())

//routes
app.use('/api/v1/store', store)

app.use("*", (req,res)=>{
    res.send(`route doesn't exist`)
})

// npm i express-async-errors


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening at port: ${port}... `))
    } catch (error) {
        console.log(error)
    }
}

start()