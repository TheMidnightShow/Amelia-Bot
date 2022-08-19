const discord = require("discord.js"); // discord API
const intents = discord.GatewayIntentBits; // Intents (to chose the bot functions)


let client = new discord.Client({
  intents: [
    intents.Guilds, 
    intents.GuildMessages,
    intents.GuildMembers,
    intents.MessageContent,     
  ]
})

exports.client = client;
