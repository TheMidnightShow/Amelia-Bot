// TODO: make good code

const Discord = require("discord.js");
const intents = Discord.GatewayIntentBits;
const fs = require("fs");
const { ai_token, amelia_token } = require("../conf.json");
const prefix = "$";

let client;

// create a new discord client;
function create_client() {
  const client = new Discord.Client({
    intents: [
      intents.Guilds, 
      intents.GuildMessages,
      intents.GuildMembers,
      intents.MessageContent,     
    ]
  })
  
  return client;
}

// get avaliable commands;
function get_commands() {
  const commands = new Discord.Collection();
  const command_files = fs.readdirSync("./src/commands");
  
  command_files.map(item => {
    const cmd = require(`../src/commands/${item}/${item}.js`);
    commands.set(cmd.name, cmd);
  })
  
  return commands;
}

// execute commands
function cmd_exec(m) {
  const cmd = m.content.slice(prefix.length).split(/ +/);
  try {
    client.commands.get(cmd.shift().toLowerCase()).execute(m);  
  } catch (err) {
    return 0; 
  }
}

// handle messages
function handle(m) {
  const message = {
    content: m.content,
    author:  m.author,
    bot:     m.author.bot,
  }
  
  if (message.content.startsWith(prefix) && !message.bot) {
    cmd_exec(m);
  }
}

// login as client;
client = create_client();
client.commands = get_commands()
client.login(amelia_token);

// once ready, notify
client.on("ready", () => { 
  
  console.log("\n[ Amelia is ready ]\n"); 
});


client.on("messageCreate", async message => {
  handle(message);
});





