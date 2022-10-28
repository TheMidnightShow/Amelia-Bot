const { joinVoiceChannel } = require("discord.js");

function main(message) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
}

module.exports = {
  name: "pong",
  main 
}
