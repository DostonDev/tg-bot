const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    chatId:{
        type:String,
        unique:true
    },
    name:{
        type:String
    },
    group:{
        type:String
    },
    phone:{
        type:String
    },
    step:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('crud',studentSchema)