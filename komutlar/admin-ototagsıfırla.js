const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../config.json"),
  prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`
        )
    );

  let tagoto =
    (await db.fetch(`ototag?Ototag_${message.guild.id}`)) ||
    (await db.fetch(`ototag?OtotagKanal_${message.guild.id}`));
  if (!tagoto)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription(
          `Bu sistem zaten kapalı durumda. Açmak için **${prefix}ototag-ayarla <kanal> <tag>**`
        )
    );
  db.delete(`ototag?Ototag_${message.guild.id}`);
  db.delete(`ototag?OtotagKanal_${message.guild.id}`);
  message.channel.send(
    new Discord.MessageEmbed()
      .setFooter(`${message.author.username} Kullandı!`)
      .setTitle(`İşlem Başarılı!`)
      .setTimestamp()
      .setDescription(
        `Ototag sistemi başarıyla kapatıldı!`
      )
  );
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["ototag-sıfırla"],
  permLevel: 0,
  kategori: "yetkili"
};
exports.help = {
  name: "ototag-sıfırla",
  description: "Ototag sıfırlar.",
  usage: "ototag-sıfırla"
};
