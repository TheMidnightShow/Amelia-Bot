module.exports = {
  name: "ping",
  description: "ping command",
  async execute(a) {
    a.channel.send("pong");
  }
}
