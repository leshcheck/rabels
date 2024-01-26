const Discord = require("discord.js"); 
const db = require("quick.db");
exports.run = (client, message, args) => {
  let kanal = client.channels.cache.get(db.fetch(`ökanal_${message.guild.id}`));

  let öneri = args.slice(0).join(" ");
  if (!kanal)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription(
          "Öneri-Log kanalı ayarlanmamış. Lütfen ayarlamak için `önerilog #kanal` komutunu kullanın!"
        )
    );
  if (!öneri)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Önerini yazman gerek!")
    );
  if (öneri.length > 500)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Önerin `500` karakterden fazla olamaz!")
    );
  if (öneri.length < 5)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Önerin `5` karakterden az olamaz!")
    );
  let user = message.mentions.users.first();
  if (user)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Seni Akıllı!`)
        .setDescription("Öneri komudunda kimseyi etiketleyemezsin!")
    );

  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle(`İşlem Başarılı!`)
      .setTimestamp()
      .setFooter(`${message.author.username} Kullandı!`)
      .setDescription("Önerin işleme alındı! ")
  );
  let botclb = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setFooter(message.author.username, client.user.avatarURL())
    .setTitle("Yeni Öneri! ")
    .setTimestamp()
    .setDescription(
      `Öneren Kişi : ${message.author} ( ${message.author.id} ) \n Önerisi : **${öneri}** `
    );
  kanal.send({ embed: botclb });
};

(exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["öneri", "öneriyap", "öneri-yap", "öner"],
  permLevel: 0,
  kategori: "kullanıcı"
}),
  (exports.help = {
    name: "öneri",
    description: "Bot için bir komut veya sistem önerir.",
    usage: "öneri"
  });
