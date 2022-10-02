let { EmbedBuilder } = require( 'discord.js' );

// main menu
let board = new EmbedBuilder()
  .setTitle('Wordle.js')
  .setDescription('Guess the word in six tries or less!')
  .setColor('0xebdbb2')
  .addFields(
    { name: 'rules', value: '\`\`\`# submit every guess with \"+guess your_guess\" \n# each guess must be a 5-letter word \n# after each guess, the bot will tell how well you did\`\`\`', inline: false },
    { name: '\u200B', value: '        type **" +ready "** to start!' }
  )

// once player is ready
  let boardReady = new EmbedBuilder()
    .setTitle('Wordle.js')
    .setDescription('It\'s showtime!')
    .setColor('0xebdbb2')
    .addFields(
      { name: '\u200B', value: `\`\`\`prepare. . .\`\`\``, inline: false },
    );

// in case player ignored the menu
function boardIgnored(message)
{
  let boardReady = new EmbedBuilder()
    .setTitle('Wordle.js')
    .setDescription('False alarm!')
    .setColor('0x282828')
    .addFields(
      { name: 'Cancelled!', value: `\`\`\`Nobody wanted to play, it appears. . .\`\`\``, inline: false },
    );
    message.edit({ embeds: [boardReady] });      
};

exports.board = board;
exports.boardReady = boardReady;
exports.boardIgnored = boardIgnored;
