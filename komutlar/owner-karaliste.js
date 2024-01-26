const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../config.json')

exports.run = async (client, message, args) => {
   if(message.author.id !== ayarlar.sahip)  {
    const embed = new Discord.MessageEmbed()
    .setDescription(`**:x: Bu Komut Yapımcıma Özeldir !**`)
    .setColor('BLUE')
    return message.channel.send(embed).then(msg=>msg.delete(5000));
    }
  let user = client.users.get(args.slice(0).join(' '));
  if (!user) {
    let e = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("Kara listeye almak istediğin kullanıcının ID'ini yaz!")
    message.channel.send({embed: e})
    return;
  };

  if (db.has(`karalist_${user.id}`) === true) return message.reply("Bu kullanıcı zaten kara listede!");

  db.set(`karalist_${user.id}`, "aktif")

  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${user.tag} adlı kullanıcı başarıyla kara listeye alındı!`)
    message.channel.send({embed: embed})

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["blacklist", "kara-liste"],
  permLevel: 4,
  kategori: "sahip"
};

exports.help = {
  name: "karaliste",
  description: "Belirtilen kullanıcıyı kara listeye alır!",
  usage: "karaliste <kullanıcı ID>"
};