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

  let abonerol = message.mentions.roles.first();
  if (!abonerol)
    return message.channel.send(
      new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription(
        "Lütfen abone rolünü etiketlermisin?"
      )
    );

  db.set(`abonerolü_${message.guild.id}`, abonerol.id);
  message.channel.send(
    new Discord.MessageEmbed().setTitle(`İşlem Başarılı!`).setTimestamp().setFooter(`${message.author.username} Kullandı!`).setDescription(
      `Abone rolü başarıyla ayarlandı; **${abonerol}**`
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
  name: "abonerol-ayarla",
  description: "Abone rolünü ayarlar.",
  usage: "abonerol-ayarla <@rol>"
};
