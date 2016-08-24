var TelegramBot = require('node-telegram-bot-api');
//var token = '241541370:AAFDmurmyFNvxGGtbnZZz-LSS9QARvKDJtk';  //ProstoZBot
var token = '123317922:AAHeGHkYrGqFmDqQDmKtS1E5IBkrUbDgQO4';  //BackBot
var botOptions = { polling: false};
var bot = new TelegramBot(token, botOptions);
var opts = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{'text':'Online','callback_data':'online'},
                {'text':'Offline','callback_data':'offline'}
            ]
        ]
    })
};

//bot.getMe().then(function(me)
//{
//    console.log('Hello! My name is %s!', me.first_name);
//    console.log('My id is %s.', me.id);
//    console.log('And my username is @%s.', me.username);
//});


bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;    //    var messageDate = msg.date;   var messageUsr = msg.from.username;
    switch (messageText) {
        case '/start':
            console.log(opts);
            bot.sendMessage(messageChatId, 'Hi Employees!, Work now?', opts);
            break;
        case 'hi':
            bot.sendMessage(messageChatId, 'Work now?');
            break;
        default:
            bot.sendMessage(messageChatId, 'Unknown command!');
    }
    console.log(msg);
});

bot.on('callback_query', function(inline_msg)
{
    var messageChatId = inline_msg.message.chat.id;
    var mess_id = inline_msg.message.message_id;
    var messageText = inline_msg.message.text; //   var messageUsr = msg.from.username;

    var query = inline_msg.data;
    console.log(inline_msg);
    switch (query) {
        case 'online':
            var opts1 = {
//                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{'text':'Send' + '\n' + ' Demand','callback_data':'send_demand'},   //\u0010 \u0013
                         {'text':'Stop \u000A \u000D Send','callback_data':'stop_demand'}
                        ]
                    ]
//                })
            };

            console.log('Edit mess_id = ' + mess_id);
            console.log('Chat_id = ' + messageChatId);
//            bot.editMessageText('Test - Test', {chat_id:messageChatId, message_id:mess_id}, opts);
            var respon = bot.editMessageReplyMarkup(opts1, {chat_id:messageChatId, message_id:mess_id});
//            console.log(opts1);
            console.log(respon.text);
            break;
        case 'offline':
            bot.sendMessage(messageChatId, ' offline - ' + messageText);
            break;
        case 'send_demand':
            bot.editMessageReplyMarkup({inline_keyboard: [[{'text':'\u1F504 Demand list','callback_data':'demand_list'}, {'text':'\uF30D Old Demand and Archive','callback_data':'old_demand'}],
                                                          [{'text':'Offline','callback_data':'offline'}, {'text':'Stop Send','callback_data':'stop_demand'}]]}
                                    , {chat_id:messageChatId, message_id:mess_id});
//            bot.answerCallbackQuery(mess_id, 'Ok, here ya go!');
            break;
        default:
            bot.sendMessage(messageChatId, 'Unknown command!');
    }


})



/*
 bot.getMe().then(function(me)
 {
 console.log('Hello! My name is %s!', me.first_name);
 console.log('My id is %s.', me.id);
 console.log('And my username is @%s.', me.username);
 });
 */


/*
function sendMessageByBot(aChatId, aMessage, opts)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a cute bot!' });
    bot.sendMessage(aChatId, aMessage, opts);
}
*/


/*
var TelegramBot = require('node-telegram-bot-api');
var token = '241541370:AAFDmurmyFNvxGGtbnZZz-LSS9QARvKDJtk';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    if(msg.text == 'online')  bot.sendMessage(chatId, "", {caption: "I'm a bot!"});
});*/
