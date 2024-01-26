const Discord = require('discord.js');
const ayarlar = require('../config.json');
const db = require('quick.db')

exports.run = async(client, message, params) => {
  
let prefix = db.fetch(`prefix_${message.guild}`) || ayarlar.prefix;
    
const emn = new Discord.MessageEmbed()
.setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'eğlence').map(cmd => `
:white_small_square: **${prefix}${cmd.help.name}** ${cmd.help.description}`).join(""))
.setTitle("Rabels")
.setFooter("Rabels")
return message.channel.send({ embed: emn });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eğlence-sistemi', 'eğlence-sistem', 'sistem-eğlence', 'sistemi-eğlence', 'yardım-eğlence'],
  permLevel: 0
};
exports.help = {
  name: 'eğlence-yardım',
  description: 'Eğlence menüsünü açar.',
  usage: '!eğlence-yardım'
};
