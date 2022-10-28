const { Connection, createCommand }      = require("./connection.js")        

const name = 'disco'
const desc = 'music daemon'
const data = createCommand(name, desc);

let connection;

module.exports = 
{
  data,
  name,
  async main(interaction) 
  {

    // if there is no connection, create one;
    if (connection == undefined)
    {
      connection = new Connection(interaction) 
      await connection.tryConnect();

      !connection.audioPlayer && connection.queue.length > 0 ? connection.playSong() : 0;
    }
    else 
    {
      connection.handleInputs(interaction) 
    }
  }
}


