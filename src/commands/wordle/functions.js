const { prefix } = require('../../conf.json');
const { board, boardReady, boardIgnored } = require('./embeds.js')

async function menu(board)
{
  let filter = res => { res.content.toLowerCase() === `${prefix}start`};  
  board.channel.awaitMessages({
    filter, 
    max: 1,
    time: 10000,
    fetchReply: true,
    erros: ['time'],
  }).then(got => {
    board.edit({ embeds: [boardReady] }); 
    got.first().delete();
  }).catch(() => { 
    board.edit({ embeds: [boardIgnored] });
  });
};

function startGame()
{

};

exports.menu = menu;
