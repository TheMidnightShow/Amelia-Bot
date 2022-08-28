//######################################//
//                Index                 //
//######################################//

const { prefix, token } = require("./conf.json");
const { client }= require("./MeiModules/CreateClient.js")
const { Handler } = require("./MeiModules/Handler.js")

client.on("ready", () => 
{ 
  console.log("Mei is ready!"); 
});

client.on("messageCreate", async message => 
{
  new Handler(message);
});

client.login(token);

