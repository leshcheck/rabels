const botclub = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new botclub.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`))
  
  let botclub1 = args[0];

  let kanal = message.mentions.channels.first();

  let x;
  if (botclub1 === "ayarla") x = ".";
  if (botclub1 === "sıfırla") x = ".";
  if (!x)
    return message.channel.send(
      new botclub.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Lütfen **ayarla** veya **sıfırla** yazınız!")
    );

  if (botclub1 === "ayarla") {
    if (!kanal)
      message.channel.send(
        new botclub.MessageEmbed()
          .setTitle(`Olamaz Bir Hata!`)
          .setDescription("Bir kanal belirtmelisin!")
      );
    db.set(`ökanal_${message.guild.id}`, kanal.id);
    return message.channel.send(
      new botclub.MessageEmbed()
        .setTitle(`İşlem Başarılı!`)
        .setTimestamp()
        .setFooter(`${message.author.username} Kullandı!`)
        .setDescription(
          "Öneri-Log kanalı başarıyla **<#" + kanal + ">** olarak ayarlandı!"
        )
    );
  }
  if (botclub1 === "sıfırla") db.delete(`ökanal_${message.guild.id}`);
  return message.channel.send(
    new botclub.MessageEmbed()
      .setTitle(`İşlem Başarılı!`)
      .setTimestamp()
      .setFooter(`${message.author.username} Kullandı!`)
      .setDescription("Öneri-Log kanalı sıfırlandı!")
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["öneri-log"],
  permlevel: 0,
  kategori: "yetkili"
};
exports.help = {
  name: "önerilog",
  description: "Öneri'lerin logunu tutar."
};
