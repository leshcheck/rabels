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

  let aboneyetkilisi = message.mentions.roles.first();
  if (!aboneyetkilisi)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Lütfen abone yetkili rolünü etiketlermisin?")
    );

  db.set(`aboneyetkilisi_${message.guild.id}`, aboneyetkilisi.id);
  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle(`İşlem Başarılı!`)
      .setDescription(
        `Abone yetkili rolü başarıyla ayarlandı; **${aboneyetkilisi}**`
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
  name: "aboneyetkili-ayarla",
  description: "Abone rolü vericek yetkiliyi ayarlar.",
  usage: "aboneyetkilisi-ayarla <@rol>"
};
