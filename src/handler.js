const { commands } = require("./commands.js")

const error =
{
  title: "error"
}

const err = (intr) => 
  intr.reply({ embeds : [error], ephemeral : true });

const getCommand = (intr) => 
  commands.get(intr.commandName || intr.message.interaction.commandName) 

const interactionHandler = (intr) => 
  getCommand(intr) ? getCommand(intr).main(intr) : err(intr);

module.exports = 
{
  interactionHandler,
}
