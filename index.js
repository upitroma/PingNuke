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
    
    if (true){ //message.content.startsWith(PREFIX)){

	if(message.author.id==secrets.userIds[4]){
		return
	}
	
	if(message.author.id=="159985870458322944"){
		message.channel.send("<@159985870458322944> Shut up you stupid bot!")
	}

        //ping spam
        if(message.content.includes("!C")){
            for(i=0;i<5;i++){
                message.channel.send("<@"+secrets.userIds[0]+">")
            }
        }
        if(message.content.includes("!M") || message.content.includes("!G")){
            for(i=0;i<5;i++){
                message.channel.send("<@"+secrets.userIds[1]+">")
            }
        }
        
        if(message.content.includes("!A")){
            for(i=0;i<5;i++){
                message.channel.send("<@"+secrets.userIds[3]+">")
	    }
	}
	
        if(message.content.includes("!J")){
            for(i=0;i<5;i++){
                message.channel.send("<@"+secrets.userIds[4]+">")
	    }
	}




        //!poll
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
    

    	//dadbot
    	else if(message.content.includes("I'm")&& message.author.bot === false){
        	dadMsg = message.content.split(`I'm`).pop();
        	botChannel.send("<@"+message.author.id+"> Hi"+dadMsg+", I'm dad!");
    	}

    	//!source
    	else if(message.content.startsWith("!source")){
        	message.channel.send("https://github.com/upitroma/PingNuke")
    	}
    }
});
