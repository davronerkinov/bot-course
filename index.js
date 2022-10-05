const TelegramApi =require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5784112629:AAEoAjnSDk9dJ3QxwPax26DusU9DRV9l3MA'

const bot = new TelegramApi((token), {polling: true})

const chats = {}



const startGame = async(chatId) => {
    await bot.sendMessage(chatId, `Hozir men 0 dan 9 gacha son yozaman tanla` )
    const randomNumber = Math.floor(Math.random() * 10)
    chatId[chatId] = randomNumber;
    return bot.sendMessage(chatId, 'Toping!', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description:'Qalesila'},
        {command: '/info', description:'yaxshimisila'},
        {command: '/game', description:"Sonni topish o'yini"}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
    
        if(text === "/start"){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
            return bot.sendMessage(chatId, `Hush kelibsiz! ${msg.from.first_name}`);
        }
        if(text === "/info"){
            return bot.sendMessage(chatId, `Sening isming ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text === '/game') {
           return startGame(chatId)
        }
        return bot.sendMessage(chatId, "Men seni tushunmadim, yana harakat qilib ko'r ")
        
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again' ) {
            return startGame(chatId)
        }
        if(data === chats[chatId]) {
            return bot.sendMessage(chatId, ` Tabriklayman sen raqamni topting ${chats[chatId]}`, againOptions)
        }else{
            return bot.sendMessage(chatId, ` Afsuski topa olmadingiz ${chats[chatId]} emas`, againOptions)
        }
    })
}

start()