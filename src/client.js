const { Client, GatewayIntentBits } = require("discord.js");

function 
createClient() 
{
  const dClient = new Client({
    intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,     
      GatewayIntentBits.GuildVoiceStates,     
    ]
  })

  return dClient;
}

const client = createClient();

exports.client = client;
