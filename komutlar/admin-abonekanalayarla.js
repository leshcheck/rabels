const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`
        )
    );

  let kanal = message.mentions.channels.first();
  if (!kanal)
    return message.channel.send(
      new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription(
        "Lütfen abone kanalını etiketlermisin?"
      )
    );

  db.set(`abonek_${message.guild.id}`, kanal.id);

  message.channel.send(
    new Discord.MessageEmbed().setTitle(`İşlem Başarılı!`).setTimestamp().setFooter(`${message.author.username} Kullandı!`).setDescription(
      `Abone kanalı başarıyla ayarlandı; **${kanal}**`
    )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: "abonekanal-ayarla",
  description: "Abone kanalını ayarlar.",
  usage: "abonekanal-ayarla <#kanal>"
};
