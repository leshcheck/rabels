const Discord = require('discord.js');
const ayarlar = require('../config.json');
const db = require('quick.db')

exports.run = function(client, message, args) {

let embed = new Discord.MessageEmbed()
.setColor("RANDOM")

let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

const dd = new Discord.MessageEmbed()
.setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'görev').map(cmd => `
:white_small_square: **${prefix}${cmd.help.name}** ${cmd.help.description}`).join(""))
.setTitle("Rabels")
.setFooter("Rabels")
return message.channel.send({ embed: dd });


/*.setDescription(`
\`${ayarlar.prefix}görevli\` Görev vericek rolü ayarlar.
\`${ayarlar.prefix}görevlog\` Logların düşeceği kanalı ayarlar.
\`${ayarlar.prefix}görev-ekle\` Belirtilen kullanıcıya görev ekler.
\`${ayarlar.prefix}görev-sil\` Belirtilen miktarda görev siler.
\`${ayarlar.prefix}görev\` Belirtilen kullanıcı'nın görevlerini görürsünüz.
`)*/


message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  aliases: ['task-system', 'görev-sistem', 'görev-yardım', 'yardım-görev'],
  permLevel: 0,
};

exports.help = {
  name: "görev-sistemi"
};