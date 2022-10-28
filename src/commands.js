const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { amelia_token } = require('../conf.json');

const { Collection } = require("discord.js");
const { client } = require("./client.js");

const fs = require("fs");

// scommands: s as in slash 
function 
fetch_scommands()
{
  //  set a new collection and get command dir
  const scommands = new Collection();
  const scommandFiles = fs.readdirSync("./src/slash");

  scommandFiles.map(item => {
    const command = require(`../src/slash/${item}/${item}.js`);
    scommands.set(command.name, command);
  });

  return scommands;
}

async function 
reloadCommands(commands)
{
  const rest = new REST({ version: '9' }).setToken(amelia_token);

  try 
  {
    console.info("[INFO] : refresing app slash commands");

    await rest.put(
      Routes.applicationCommands("864291612334096394"),
      { body: commands },
    );

    console.info("[INFO] : slash commands ready");
  }
  catch (err)
  {
    console.info("[ERROR] : slash reset failed");
  }
} 

function slash_commands()
{
  const commands = [];
  const commandFiles = fs.readdirSync('./src/slash/');

  commandFiles.map(item => 
  {
    const command = require(`./slash/${item}/${item}.js`); 
    commands.push(command.data.toJSON());
  })

  reloadCommands(commands);
}

function 
slash_handler(interaction)
{ 
  const rep = 
  {
    title: `Failed to run \'${interaction.commandName}\'`,
    color: 0xebdbb2,
    footer: 
    {
      text: 'Perhaps this command may not exist'
    }
  }

  const slash = client.commands.get(interaction.commandName || interaction.message.interaction.commandName);
  slash ? slash.main(interaction) : interaction.reply({ embeds: [rep], ephemeral: true });
  
}

function 
message_processor(message)
{ 
}

exports.fetch_scommands   = fetch_scommands;
exports.slash_commands    = slash_commands;
exports.slash_handler     = slash_handler;
exports.message_processor = message_processor;
