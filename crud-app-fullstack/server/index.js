require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors =  require('cors')
const router = require('./routes/userRoute')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database Connected Successfully")

    app.listen(port, ()=>{
        console.log(`Server running at port ${port}`)
    })

}).catch((err) => {
    console.log("Error connecting to the database",err.message)
})


app.use("/api", router)
