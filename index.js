const { Client, Intents }= require('discord.js');
const secrets = require("./secrets.json");
// const bot = new Discord.Client();

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.login(secrets.TOKEN);


console.log("starting bot...")

const DISCORD_SERVER_ID = "732348936211136663"
const PING_CHANNEL = "775031298371878942"  

bot.once("ready", async () => {

    // Fetch the channel
    botTestingChannel = await bot.channels.fetch("775031298371878942")
  
    botTestingChannel.send("Hello world!")
    console.log("connected to discord")



    bot.api.applications(bot.user.id).guilds(DISCORD_SERVER_ID).commands.post({
        data: {
            name: "ping",
            description: "ping spam late team members",
            options: [
                {
                    name:"users",
                    description:"list of users to ping spam",
                    required: true,
                    type: 3
                }

            ]
            //possible options here e.g. options: [{...}]
        }
    });

    bot.api.applications(bot.user.id).guilds(DISCORD_SERVER_ID).commands.post({
        data: {
            name: "remove",
            description: "stop pinging specific team members",
            options: [
                {
                    name:"users",
                    description:"list of users to stop pinging",
                    required: true,
                    type: 3
                }

            ]
        }
    });

    bot.api.applications(bot.user.id).guilds(DISCORD_SERVER_ID).commands.post({
        data: {
            name: "stop",
            description: "stop the ping cannon",
        }
    });

    bot.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        console.log(args)

        if (command === 'ping'){ 
            // here you could do anything. in this sample
            // i reply with an api interaction
            bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "starting the ping cannon..."
                    }
                }
            })
            lateUsers=args[0].value.split(" ")
            startTime = new Date().getTime(); // keep track of time so the interval stops after 10 minutes
            pingcannonActive=true
            pingSpam()
        }
        else if(command === 'stop'){
            pingcannonActive=false
            bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "cease fire"
                    }
                }
            })
        }
        else if(command === 'remove'){
            var callback = ""
            args[0].value.split(" ").forEach(element => {
                if (lateUsers.includes(element)){
                    lateUsers.splice(lateUsers.indexOf(element),1)
                    callback = callback= "stopped pinging "+args[0].value
                }
                else{
                    callback= "could not find "+args[0].value+" in the list of users to ping"
                }
            });
            if(lateUsers.length==0){
                pingcannonActive=false
                callback= "no users left to ping. cease fire"
            }
            bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: callback
                    }
                }
            })
            
        }
    });

    bot.ws.on('MESSAGE_CREATE', async message => {
        if (message.author.bot){
            if (message.content.startsWith("./ping") && pingcannonActive){
                pingSpam()
            }
        }
    });
})

var lateUsers=[]
var pingcannonInterval //set to interval at runtime
var pingcannonActive=false
var startTime=0
function pingSpam(){

    bot.channels.cache.get(PING_CHANNEL).send(`./ping `+lateUsers.join(" "))

    //stop ping cannon after 10 minutes
    if(new Date().getTime() - startTime > (10*60*1000)){ 
        pingcannonActive=false
        bot.channels.cache.get(PING_CHANNEL).send("10 minutes have passed. cease fire")
    }
}



  