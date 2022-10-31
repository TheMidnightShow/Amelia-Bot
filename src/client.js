const { Client, GatewayIntentBits } = require("discord.js");

const intents = 
[
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.MessageContent,     
  GatewayIntentBits.GuildVoiceStates,
];

const createClient = (intents) =>
  new Client({ intents })

const client = createClient(intents)

module.exports = 
{
  client,
}
