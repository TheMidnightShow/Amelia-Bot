const { prefix } = require("../conf.json")
const { commands } = require("./Commands.js")

handler = (msg) => {
  console.log(`${msg.author.username} : ${msg.content}`);
  if(!msg.content.startsWith(prefix) || msg.author.bot) return

  let args = msg.content.slice(prefix.length).split(/ +/);
  let command = args.shift().toLowerCase();
  let commandExist = commands.get(command);

  commandExist ? commandExist.execute(msg, args) : 0;
}

exports.handler = handler;
