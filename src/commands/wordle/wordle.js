module.exports = 
{
  name: "wordle",
  async execute(message) {

    // embed structure
    function create_embed(desc, col) {
      const embed_struct = {
        title: "Wordle.js",
        description: desc,
        color: col,
      }
      
      return embed_struct;
    }
    
    function update_message(bot_message, content) {
      bot_message.edit({ embeds: [content]});
      message.delete();
    }

    function prepare_game(bot_message) {
      const expect = "$test";
      
      bot_message.channel.awaitMessages({
        expect, max: 1, time: 5000, fetchReply: true, errors: ['time'],
      }).then(got => {
        let content = create_embed('test--1', 0xebdbb2);
        got.delete();
        return update_message(bot_message, content);
      }).catch(() => {
        let content = create_embed('test--2', 0x222222);
        return update_message(bot_message, content);
      });
    }
     
    async function main() {
      const bot_message = await message.channel.send({ embeds: [create_embed('test', 0xffffff)]});

      prepare_game(bot_message);
    }
    
    main();
  }
}
