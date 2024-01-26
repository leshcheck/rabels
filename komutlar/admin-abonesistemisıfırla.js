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

  if (!db.fetch(`abonek_${message.guild.id}`))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Görünüşe göre abone sistemi zaten kapalı görünüyor!")
    );

  message.channel.send(
    new Discord.MessageEmbed()
      .setFooter(`${message.author.username} Kullandı!`)
      .setTimestamp()
      .setTitle(`İşlem Başarılı!`)
      .setDescription(
        "Abone sistem ayarları sıfırlanıp başarı ile kapatılmıştır!"
      )
  );
  db.delete(`abonek_${message.guild.id}`);
  db.delete(`abonerolü_${message.guild.id}`);
  db.delete(`aboneyetkilisi_${message.guild.id}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: "abonesistemi-sıfırla",
  description: "Abone sistemini sıfırlar.",
  usage: "abonesistemi-sıfırla"
};
