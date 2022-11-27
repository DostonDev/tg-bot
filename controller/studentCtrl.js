const Students = require('../model/studentModel')

const studentCtrl = {
    create: async (chatId) => {
        try {
            const student = new Students({
                chatId: chatId
            })
            await student.save()
            console.log(student)
        } catch (error) {
            console.log(error)
        }
    },
    getStudentName: async (chatId, text, bot) => {
        try {
            await Students.findOneAndUpdate({
                chatId
            }, {
                name: text,
                step: 1
            })
            await bot.sendMessage(chatId, 'Guruhni kiriting', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "5",
                            callback_data: "group 5"
                        }, {
                            text: "6",
                            callback_data: "group 6"
                        }],
                        [{
                            text: "7",
                            callback_data: "group 7"
                        }, {
                            text: "8",
                            callback_data: "group 8"
                        }],
                    ]
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    getStudentNumber: async (chatId,text,bot) => {
        try {
            await Students.findOneAndUpdate({
                chatId
            }, {
                phone: text,
                step: 3
            })
            const user = await Students.findOne({
                chatId
            })
            console.log(Students)
            await bot.sendMessage(chatId, `Muvafaqiyatli bo'ldi\nIsm: ${user.name}\nGuruh: ${user.group}\nTelefon nomer: ${user.phone}`)
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = studentCtrl