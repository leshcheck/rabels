const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../config.json");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`
        )
    );

  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription(
          "Lütfen abone rol verme sayısını sileceğin kişiyi etiketle!"
        )
    );
  if (db.has(`aboneistatistik${user.id}`) === 0)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("Zaten Kimseye Abone Vermemiş!")
    );

  message.channel.send(
    new Discord.MessageEmbed()
      .setTimestamp()
      .setFooter(`${message.author.username} Kullandı!`)
      .setTitle(`İşlem Başarılı!`)
      .setDescription(
        "Belirtilen kişinin abone rol verme sayısı sıfırlanmıştır."
      )
  );
  db.delete(`aboneistatistik.${message.author.id}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["abonestats-sıfırla"],
  permLevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: "abone-sıfırla",
  description: "Abone stats sıfırlar.",
  usage: "abonestats-sıfırla"
};
