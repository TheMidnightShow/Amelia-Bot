// TODO: make good code

const { client } = require("./client.js")
const { interactionHandler } = require("./handler.js");
const { fetchCommands, loadCommands, reloadCommands } = require("./commands.js");
const { token } = require("../conf.json");

fetchCommands()
loadCommands()
reloadCommands()

client.login(token)
client.on("interactionCreate", async interaction => interactionHandler(interaction));
