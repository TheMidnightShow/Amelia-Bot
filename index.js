
const { prefix, token } = require("./conf.json");
const { client }= require("./MeiModules/CreateClient.js")
const { commands } = require("./MeiModules/Commands.js")
const { handler } = require("./MeiModules/Handler.js")

client.once("ready", () => 
{ 
  console.log("Mei is ready!"); 
});

client.on("messageCreate", async message => 
{
  handler(message)
});

client.login(token);

