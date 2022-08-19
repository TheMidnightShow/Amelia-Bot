
const { prefix, token } = require("./conf.json");
const { client }= require("./MeiModules/CreateClient.js")
const { commands } = require("./MeiModules/Commands.js")

client.once("ready", () => 
{ 
  console.log("Mei is ready!"); 
});

client.on("messageCreate", async message => 
{
  console.log(`${message.author.username} : ${message.content}`);
  if(!message.content.startsWith(prefix) || message.author.bot) return

  let args = message.content.slice(prefix.length).split(/ +/);
  let command = args.shift().toLowerCase();
  let commandExist = commands.get(command);

  commandExist ? commandExist.execute(message, args) : 0;
});

client.login(token);

