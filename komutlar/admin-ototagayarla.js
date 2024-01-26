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
  if (tagoto)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDesription(
          `Bu sistem zaten aktif durumda. Kapatmak için **${prefix}ototag-sıfırla**`
        )
    );
  let ototag_kanal = message.mentions.channels.first();
  let ototag_tag = args.slice(1).join(" ");
  if (!ototag_kanal || !ototag_tag)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription(
          `Ototag sistemini ayarlamak için **kanal ve tag** belirtmelisin.`
        )
    );

  db.set(`ototag?Ototag_${message.guild.id}`, ototag_tag);
  db.set(`ototag?OtotagKanal_${message.guild.id}`, ototag_kanal.id);
  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle(`İşlem Başarılı!`)
      .setTimestamp()
      .setFooter(`${message.author.username} Kullandı!`)
      .setDescription(
        `Ototag Aktif Edildi!\nTag: \`${ototag_tag}\` Olarak Güncellendi!\nKayıt Kanalı ${ototag_kanal} Olarak Güncellendi!`
      )
  );
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["ototag-ayarla"],
  permLevel: 0,
  kategori: "yetkili"
};
exports.help = {
  name: "ototag-ayarla",
  description: "Ototag ayarlar.",
  usage: "ototag-ayarla"
};
