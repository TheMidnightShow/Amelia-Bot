const { EmbedBuilder } = require("discord.js");

module.exports = 
{
  name: "wordle",
  description: "wordle game",
  async execute(message, args, client) 
  {
    let msg = await message.channel.send("testing");
    msg.react("🔴");

    let filter = reaction => reaction.emoji.name;

    let collector = msg.createReactionCollector({ filter, time: 5000 });

    collector.on('collect', reaction => {
      console.log(`collected ${reaction.emoji.name}`) 
    });

    collector.on('end', collected => {
      console.log(`collected ${collected.size} items`)
    })
  }
}
