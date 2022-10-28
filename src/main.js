// TODO: make good code

const { client } = require("./client.js")

const 
{ 
  slash_handler,
  slash_commands,
  fetch_scommands,
  message_processor,
} = require("./commands.js");

const 
{ 
  ai_token, 
  amelia_token 
} = require("../conf.json");


slash_commands();
// login as client;
client.commands = fetch_scommands();
client.login(amelia_token);

// once ready, notify
client.on("ready", () => { 
  console.log("[INFO] : Bot is ready"); 
});

client.on(
  "messageCreate", 
  async message => 
  {
    message_processor(message);
  }
);

client.on(
  "interactionCreate",
  async interaction =>
  {
    slash_handler(interaction);
  }
);
