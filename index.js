const Discord = require('discord.js');
const secrets = require("./token.json");
const bot = new Discord.Client();
bot.login(secrets.TOKEN);


const PREFIX = '!';

var botChannel
bot.once("ready", async () => {
    // Fetch the channel
    botChannel = await bot.channels.fetch("775031298371878942")
    // Note that it's possible the channel couldn't be found
    if (!botChannel) {
      return console.log("could not find channel")
    }
  
    botChannel.send("Hello world!")
  })

bot.on("message", (message) => {
    

    if (message.content.startsWith(PREFIX)){
        if(message.content=="!c"){
            botChannel.send("this should ping chris")
        }
    }

    else if(message.content.includes("I'm")&& message.author.bot === false){
        dadMsg = message.content.split(`I'm`).pop();
        botChannel.send("<@"+message.author.id+"> Hi"+dadMsg+", I'm dad!");
    }
});