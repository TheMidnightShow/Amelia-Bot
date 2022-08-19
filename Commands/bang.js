module.exports = {
  name: "bang",
  description: "bang command",
  async execute(message, args) {
    message.channel.send("bang!");
  }
}
