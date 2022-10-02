module.exports = 
{
  name: 'type',
  async execute(message)
  {
    let msg = await message.channel.send('starting');
    let filter = res => res.content === 'pong'

    setTimeout(() => {
      msg.edit('say pong!');
    }, 2500);

    msg.awaitMessages({filter, max: 1, time: 5000 }).then(got => {
     
    })
  }
}
