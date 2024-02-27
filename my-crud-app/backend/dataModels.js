const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bankName : String,
    cType : String,
    cName : String,
    date : String,
    bCode : String,
})

const Data = mongoose.model("Data", dataSchema)

module.exports = Data;