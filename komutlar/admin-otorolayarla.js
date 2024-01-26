const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../config.json");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`))

  let kanal = message.mentions.channels.first();
  let rol = message.mentions.roles.first();
  if (!rol)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Bir rol etiketle!")
    );
  if (!kanal)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Bir kanal etiketle!")
    );

  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle(`İşlem Başarılı!`)
      .setTimestamp()
      .setFooter(`${message.author.username} Kullandı!`)
      .setDescription(
        `Otorol Aktif Edildi\nRol: ${rol} Olarak Güncellendi!\nKayıt Kanalı ${kanal} Olarak Güncellendi!`
      )
  );

  db.set(`otorolkanal_${message.guild.id}`, kanal.id);
  db.set(`otorolrol_${message.guild.id}`, rol.id);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: "otorol-ayarla",
  description: "Otorol ayarlar.",
  usage: "otorol-ayarla"
};
