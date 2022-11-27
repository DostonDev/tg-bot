const TOKEN = "5830692250:AAGGB7iCFG0fvujDZVVTK4O4Ky6KnGNjm6A"
const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')
const express = require('express')
const studentCtrl = require('./controller/studentCtrl')
const studentModel = require('./model/studentModel')
const app = express()
const URL = 'mongodb://0.0.0.0:27017/student'

app.listen(5000, () => {
    console.log('Listening')
})




mongoose.connect(URL, {
    useNewUrlParser: true
}, err => {
    if (err) {
        throw err
    }
    console.log("Conected")
})



const bot = new TelegramBot(TOKEN, {
    polling: true
})



bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    const user = await studentModel.findOne({
        chatId
    })
    if (!user) {
        studentCtrl.create(chatId)
        await bot.sendMessage(chatId, 'Assalomu Aleykum \nF.I.O ni kiriting')
        return
    }
    const step = user.step

    if(text==='/start'){
        await studentModel.findOneAndUpdate({
            chatId
        },{
            step:0
        })
    await bot.sendMessage(chatId, 'Assalomu Aleykum \nF.I.O ni kiriting')
    }


    if(text!=='/start'){
        switch (step) {
            case 0: {
                studentCtrl.getStudentName(chatId,text,bot)
                break
            }
            // case 1: {
            //     console.log(text)
            //     await studentModel.findOneAndUpdate({
            //         chatId
            //     }, {
            //         name: text,
            //         step: 2
            //     })
            //     await bot.sendMessage(chatId, 'Guruhni kiriting', {
            //         reply_markup: {
            //             inline_keyboard: [
            //                 [{
            //                     text: "5",
            //                     callback_data: "group 5"
            //                 }, {
            //                     text: "6",
            //                     callback_data: "group 6"
            //                 }],
            //                 [{
            //                     text: "7",
            //                     callback_data: "group 7"
            //                 }, {
            //                     text: "8",
            //                     callback_data: "group 8"
            //                 }],
            //             ]
            //         }
            //     })
            //     break
            // }
            case 2: {
                studentCtrl.getStudentNumber(chatId,text,bot)
                break
            }
    
        }
    }

    


})
bot.addListener("callback_query", async (query) => {
    const queryText = query.data.split(" ")[0]
    const num = query.data.split(" ")[1]
    // console.log(query);
    // const text = query.message.text
    const chatId = query.message.chat.id
    const user = await studentModel.findOne({
        chatId
    })
    if (!user) {
        studentCtrl.create(chatId)
        await bot.sendMessage(chatId, 'Assalomu Aleykum \nF.I.O ni kiriting')
        return
    }
    const step = user.step
    if (queryText === "group") {
        await studentModel.findOneAndUpdate({
            chatId
        }, {
            group: num,
            step: 2
        })
        await bot.sendMessage(chatId, 'Telefon nomeringizni kiriting')
    }


    // console.log(step)
})