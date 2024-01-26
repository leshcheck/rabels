const Discord = require('discord.js');
const ayarlar = require('../config.json');
const db = require('quick.db')

exports.run = function(client, message, args) {
let embed = new Discord.MessageEmbed()
.setTitle(`Stat Sistemi`)
.setColor("RANDOM")
.setFooter("Rabels")

let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

const botclubembed = new Discord.MessageEmbed()
.setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'stat').map(cmd => `
:white_small_square: **${prefix}${cmd.help.name}** ${cmd.help.description}`).join(""))
.setTitle("Rabels")
.setFooter("Rabels")
return message.channel.send(botclubembed);

/*.setDescription(`
\`${ayarlar.prefix}stat info\` Kullanıcı bilgilerini gösterir.
\`${ayarlar.prefix}stat channel\` Kanal bilgilerini gösterir.
\`${ayarlar.prefix}stat server\` Sunucu bilgilerini gösterir.
\`${ayarlar.prefix}stat role\` Rolün bilgilerini gösterir.
\`${ayarlar.prefix}stat emoji\` Emojinin bilgilerini gösterir.
`)*/
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  aliases: ['stat-system', 'stat-sistem', 'stat-sistemi', 'yardım-stat', 'stat-yardım'],
  permLevel: 0,
};

exports.help = {
  name: "durum-sistemi"
};