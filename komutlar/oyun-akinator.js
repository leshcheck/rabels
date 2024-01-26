const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let user = message.author;
  
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"];
const isPlaying = new Set();
const { Client, MessageEmbed } = require("discord.js");
const { Aki } = require("aki-api");
const clientt = new Client({
  restTimeOffset: 0,
  ws: {
    intents: ["GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]}
  });



    if (message.author.bot || !message.guild) return;


    if (isPlaying.has(message.author.id)) {
      return message.channel.send(":x: | The game already started..");
    }

    isPlaying.add(message.author.id);

    const aki = new Aki("tr"); // diller: https://github.com/jgoralcz/aki-api

    await aki.start();

    const msg = await message.channel.send(new MessageEmbed()
      .setTitle(`${message.author.username}, Soru ${aki.currentStep + 1}`)
      .setColor("RANDOM")
      .setDescription(`**${aki.question}**
      ${aki.answers.map((an, i) => `${an} | ${emojis[i]}`).join("\n")}`));

    for (const emoji of emojis) await msg.react(emoji);

    const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id == message.author.id, {
      time: 60000 * 6
    });

    collector
      .on("end", () => isPlaying.delete(message.author.id))
      .on("collect", async ({
        emoji,
        users
      }) => {
        users.remove(message.author).catch(() => null);

        if (emoji.name == "❌") return collector.stop();

        await aki.step(emojis.indexOf(emoji.name));

        if (aki.progress >= 70 || aki.currentStep >= 78) {

          await aki.win();

          collector.stop();

          message.channel.send(new MessageEmbed()
            .setTitle("Bu senin karakterin mi?")
            .setDescription(`
            **${aki.answers[0].name}**
            ${aki.answers[0].description}
            Sıralama **#${aki.answers[0].ranking}**
            
            evet (**e / y**) / hayır (**h / n**)`)
            .setImage(aki.answers[0].absolute_picture_path)
            .setColor("RANDOM"));

          const filter = m => /(evet|e|y|hayır|h|n)/i.test(m.content) && m.author.id == message.author.id;

          message.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ["time"]
            })
            .then(collected => {
              const isWinner = /evet|e|y/i.test(collected.first().content);
              message.channel.send(new MessageEmbed()
.setTitle(isWinner ?
"Harika! Bir kez daha doğru tahmin. Evet Sayın: "+db.add(`akinatorevetsayısı_${message.guild.id}_${user.id}`, 1) : 
"Ah Kazandın. Hayır Sayın: "+db.add(`akinatorhayırsayısı_${message.guild.id}_${user.id}`, 1))
                .setColor("RANDOM")
                .setDescription("Seninle oynamayı seviyorum!"))
            }).catch(() => null);
        
        } else {
          msg.edit(new MessageEmbed()
            .setTitle(`${message.author.username}, Soru ${aki.currentStep + 1}`)
            .setColor("RANDOM")
            .setDescription(`
            **${aki.question}**
            ${aki.answers.map((an, i) => `${an} | ${emojis[i]}`).join("\n")}`));
        }})};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["aki", "akinator"],
  permlevel: 0,
  kategori: "oyun"
};

exports.help = {
  name: "akinatör",
  description: "Soru sorup karekter bulmak."
}