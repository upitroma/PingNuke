const { Client, Intents }= require('discord.js');
const secrets = require("./secrets.json");
// const bot = new Discord.Client();

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.login(secrets.TOKEN);


console.log("starting bot...")

const PREFIX = './ping ';
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