module.exports = {
  name: "ping",
  description: "ping command",
  async execute(message, args) {
    message.channel.send("pong!");
  }
}
