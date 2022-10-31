/* imports */
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, id } = require('../conf.json');
const { Collection } = require("discord.js");
const { readdirSync } = require("fs");

/* global variables */
const rest          = new REST({ version: '10' }).setToken(token); // where to post client commands
const commands      = new Collection();                            // record for command usage localy

const commandDir   = readdirSync("./src/commands");                // commands location
const restCommands = [];

/* functions */
const fetchCommands = () => 
  commandDir.map(item => 
    commands.set(require(`../src/commands/${item}/${item}.js`).name, require(`../src/commands/${item}/${item}.js`)))

const reloadCommands = () =>
  rest.put(Routes.applicationCommands(id), { body: restCommands })

const loadCommands = () =>
  commandDir.map(item => 
    restCommands.push(require(`./commands/${item}/${item}.js`).data.toJSON()))

/* exports */
module.exports = 
{
  fetchCommands,
  reloadCommands,
  loadCommands,
  commands,
}
