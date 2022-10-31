// TODO: make good code

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

function 
createCommand(name, desc)
{
  const command = new SlashCommandBuilder()
    .setName(name)
    .setDescription(desc)
    .addStringOption(option =>
      option.setName('add')
      .setDescription('add songs to queue')
    )
    .addStringOption(option =>
      option.setName('remove')
      .setDescription('remove songs from queue')
    )

  return command;
}

class Connection 
{
  constructor(interaction)
  {
    this.interaction = interaction; 
    this.connection;
    this.queue = [];
    this.audioPlayer;
    this.idle = true;
  }

  #validConnection()
  {
    this.connection = joinVoiceChannel(
      {
        channelId: this.interaction.channel.id,
        guildId: this.interaction.channel.guild.id,
        adapterCreator: this.interaction.channel.guild.voiceAdapterCreator,
      });
  }

  #invalidConnection()
  {
    this.interaction.reply(
      { 
        content: "error connecting",
        ephemeral: true 
      });
  }

  #endConnection(input)
  {
    input.reply({ content: "closed", ephemeral: true });
    this.interaction.deleteReply();

    this.connection.destroy();
    delete this;
  }

  async #pushSong(data, input = undefined)
  {
    // find audio
    let findAudio = await ytSearch(data);
    let audio = findAudio.videos[0];

    const metadata = 
    {
      title: audio.title,
      url: audio.url,
      thumbnail: audio.thumbnail,
      author: (input ? input.user.username : this.interaction.user.username),
      avatar: (input ? input.user.displayAvatarURL() : this.interaction.user.displayAvatarURL()),
    };

    this.queue.push(metadata)

    const rep = 
    {
      color: 0x986992,
      title: "</Amelia Disco>",
      description: `**Added:**\n ${metadata.title}`,
      thumbnail:
      {
        url: metadata.thumbnail,
      },
      footer: 
      {
        text: `Requested by: ${metadata.author}`,
        url: metadata.avatar,
      }
    };

    input ? 
      input.reply({ embeds: [rep], ephemeral: true }) : 
      this.interaction.followUp({ embeds: [rep], ephemeral: true});

    this.queue.length <= 1 ? this.playSong() : 0;
  }

  #removeSong(data)
  {
    this.queue.slice(data) ? console.log("deleted") : console.log("seems like it does not exist");
  }

  #nextSong(input = undefined)
  {
    if (this.queue.length >= 1)
    {
      this.queue.shift();
      this.playSong();   
      input ? 
        input.reply({ content: "skipped", ephemeral: true }) : 0;
    }
    else
    {
      input ? 
        input.reply({ content: "end of queue reached", ephemeral: true }) : 0;
    }
  }

  #idleState()
  {
      setTimeout(() => 
        {
          this.idle ? this.#endConnection() : 0;
        }, 60000
      ); 
  }

  #pause(input)
  {
    switch (this.audioPlayer._state.status)
    {
      case "paused": 
        this.audioPlayer.unpause();
        input.reply({ content: "playing", ephemeral: true })
        break;
      case "playing":
        this.audioPlayer.pause();
        input.reply({ content: "paused", ephemeral: true })
        break;
    }
  }
  #createButtons()
  {
    const row = 
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("||")
            .setCustomId("pause")
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(
          new ButtonBuilder()
            .setLabel("</>")
            .setCustomId("stop")
            .setStyle(ButtonStyle.Danger)
        )
        .addComponents(
          new ButtonBuilder()
            .setLabel(">>")
            .setCustomId("next")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
          new ButtonBuilder()
            .setLabel("[]")
            .setCustomId("queue")
            .setStyle(ButtonStyle.Secondary)
        )

    return row;   
  }

  #createMenu()
  {
    const menu = 
    {
      title: "</Amelia Disco>",
      description: "**Welcome, lets get started!**", 
      color: 0xff6e6e,
    };

    this.interaction.reply({ embeds: [menu], components: [this.#createButtons()] });
  }

  async #updateMenu()
  {
    const newMenu = 
    {
      color: 0xc9c9c9,
      title: "</Amelia Disco>",
      description: `**Now playing:**\n${this.queue[0].title}`,
      thumbnail: 
      {
        url: this.queue[0].thumbnail
      },
      footer:
      {
        text: `Requested by ${this.queue[0].author}`,
        url: this.queue[0].avatar, 
      }
    };

    this.interaction.editReply({ embeds: [newMenu] });
  }

  async #showQueue(input)
  {

    const queueItems = []; 

    this.queue.map(item => 
    {
      queueItems.push({ name: '\u200b', value: `**id:{${this.queue.indexOf(item)}} ${item.title}**`, inline: false })
    })

    const rep =
    {
      color: 0xff6e6e,
      title: "</Amelia Disco>",
      description: "**Queue (first 10 items)**",
      fields: queueItems,
    };

    input.reply({ embeds: [rep], ephemeral: true })
    console.log(queueItems)
  }

  async tryConnect()
  {
    if (this.interaction.channel.userLimit >= 0)
    {
      this.#validConnection()

      await this.#createMenu();
  
      // if the operation is called alongside an add option, handle it;
      this.interaction.options._hoistedOptions[0] ?
        await this.#pushSong(this.interaction.options._hoistedOptions[0].value) : 0; 

    }
    else 
    {
      this.#invalidConnection();
    }
  } 

  #handleSlash(input)
  {
    if (!input.options._hoistedOptions[0]) return; 
    let slash = input.options._hoistedOptions[0]
    switch (slash.name) 
    {
      case "add":
        this.#pushSong(slash.value, input);
      break;

      case "remove":
        this.#removeSong(input.value);
      break;
    }
  }
  
  #handleButton(input)
  {
    switch (input.customId) 
    {
      case "pause":
        this.#pause(input);
        break;

      case "next": 
        this.#nextSong(input);
        break;

      case "queue":
        this.#showQueue(input);
        break;

      case "stop":
        this.#endConnection(input);
        break;
    }
  }

  async handleInputs(input)
  {
    input.isButton() ? 
      this.#handleButton(input) : 
      this.#handleSlash(input);
  }

  async playSong()
  {
    if (!this.queue[0]) return;

    this.audioPlayer = createAudioPlayer();
    let resourse = createAudioResource(ytdl(this.queue[0].url, { filter: 'audioonly'}));     
    
    this.audioPlayer.play(resourse);
    this.connection.subscribe(this.audioPlayer);
    this.#updateMenu();

    this.audioPlayer.on("stateChange", (oldState, newState) =>
    {
      switch (newState.status)
      {
        case "idle":
          this.#nextSong();
          break;
      };
    });
  }
};

exports.Connection = Connection;
exports.createCommand = createCommand;
