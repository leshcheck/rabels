const botclub = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      new botclub.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Üyeleri Yasakla\` yetkisine sahip olmalısın!`
        )
    );
  let botclb = message.guild;

  botclb
    .fetchBans()
    .then(bans =>
      message.channel.send(
        new botclub.MessageEmbed()
          .setDescription(
            `> Sunucunuzda \`${bans.size}\` adet banlanmış üye bulunmaktadır!`
          )
          .setTimestamp()
          .setFooter(`${message.author.username} Kullandı!`)
      )
    )
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban-say"],
  permLevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: "bansay",
  description: "Sunucudan banlanan kişilerin sayısını gösterir",
  usage: "bansay"
};
