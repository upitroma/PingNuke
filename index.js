const Discord = require('discord.js');
const secrets = require("./secrets.json");
const bot = new Discord.Client();
bot.login(secrets.TOKEN);


console.log("starting bot...")

const PREFIX = '!';
var botChannel
bot.once("ready", async () => {
    // Fetch the channel
    botTestingChannel = await bot.channels.fetch("775031298371878942")

    try{
        botChannel = await bot.channels.fetch("765310968615796776")
    }
    catch{
        botChannel=botTestingChannel
    }
  
    botTestingChannel.send("Hello world!")
    console.log("connected and ready")
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
        else if(message.content.startsWith("!poll")){

            if(message.content.split('!poll')[1]==""){
                message.channel.send("put what you want to poll after '!poll'. ex: '!poll is water wet?'")
            }
            else{
                pollMsg = new Discord.MessageEmbed()
                .setTitle("Vote!")
                .setDescription(message.content.split('!poll')[1])

            message.channel.send(pollMsg)
                .then(sentEmbed => {
                    sentEmbed.react("👍")
                    sentEmbed.react("👎")
                })
            }

            
        }
    }

    else if(message.content.includes("I'm")&& message.author.bot === false){
        dadMsg = message.content.split(`I'm`).pop();
        botChannel.send("<@"+message.author.id+"> Hi"+dadMsg+", I'm dad!");
    }
});