const Discord = require('discord.js');
const ayarlar = require('../config.json');
const db = require('quick.db')

exports.run = function(client, message, args) {
let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter("Rabels")

let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

const botclubembed = new Discord.MessageEmbed()
.setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'sahip').map(cmd => `
:white_small_square: **${prefix}${cmd.help.name}** ${cmd.help.description}`).join(""))
.setTitle("Rabels")
.setFooter("Rabels")
return message.channel.send(botclubembed);

message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  aliases: ['yapımcı-system', 'yapımcı-sistem', 'owner-sistem', 'yardım-yapımcı', 'yapımcı-yardım', 'owner-yardım', 'yardım-owner'],
  permLevel: 0,
};

exports.help = {
  name: "yapımcı-sistemi"
};