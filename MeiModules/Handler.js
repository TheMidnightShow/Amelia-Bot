const { prefix } = require("../conf.json")
const { commands } = require("./Commands.js")
const { client } = require("./CreateClient.js")

class Handler 
{
  constructor(msg) 
  {

    this.bot = msg.bot;
    this.channel = msg.channel;
    this.message = msg.content;
    this.author = msg.author.username;
    this.args = msg.content.slice(prefix.length).split(/ +/);
    this.command = this.args.shift().toLowerCase();

    console.log(`\n${this.author} :\n==>  ${this.message}`)
    
    commands.get(this.command) ? commands.get(this.command).execute(this) : 0;

  }
}

exports.Handler = Handler;
