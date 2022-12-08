const mongoose = require("mongoose")


//create DB connection
const connectDB = (url)=>{
    mongoose.connect(url)
    console.log("DB is connected...")
}

module.exports = connectDB