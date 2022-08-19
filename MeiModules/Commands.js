const fs = require("fs");
const { client } = require("./CreateClient.js");
const { Collection } = require("discord.js")

client.commands = new Collection();

const commandFiles = fs.readdirSync("./Commands/").filter(file => file.endsWith(".js"));

for(let file of commandFiles) 
{
  const command = require(`../Commands/${file}`);
  client.commands.set(command.name, command);
}

exports.commands = client.commands;
