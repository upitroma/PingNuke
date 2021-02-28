const Discord = require('discord.js');
const secrets = require("./secrets.json");
const bot = new Discord.Client();
bot.login(secrets.TOKEN);


const PREFIX = '!';

var botChannel
bot.once("ready", async () => {
    // Fetch the channel
    botTestingChannel = await bot.channels.fetch("775031298371878942")
    botChannel = await bot.channels.fetch("765310968615796776")
    // Note that it's possible the channel couldn't be found
    if (!botChannel) {
      return console.log("could not find channel")
    }
  
    botTestingChannel.send("Hello world!")
  })

bot.on("message", (message) => {
    

    if (message.content.startsWith(PREFIX)){
        if(message.content=="!C"){
            for(i=0;i<5;i++){
                message.channel.send("<@"+secrets.userIds[0]+">")
            }
        }
        else if(message.content=="!M"){
            for(i=0;i<5;i++){
                message.channel.send("<@"+secrets.userIds[1]+">")
            }
        }
    }

    else if(message.content.includes("I'm")&& message.author.bot === false){
        dadMsg = message.content.split(`I'm`).pop();
        botChannel.send("<@"+message.author.id+"> Hi"+dadMsg+", I'm dad!");
    }
});