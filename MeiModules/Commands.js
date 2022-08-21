const fs = require("fs");
const { client } = require("./CreateClient.js");
const { Collection } = require("discord.js")

client.commands = new Collection();

const commandFiles = fs.readdirSync("./Commands/").filter(file => file.endsWith(".js"));

commandFiles.map(item => 
{
  const command = require(`../Commands/${item}`)
  client.commands.set(command.name, command);
})

exports.commands = client.commands;
