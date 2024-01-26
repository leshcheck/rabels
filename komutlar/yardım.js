const Discord = require('discord.js');
const ayarlar = require('../config.json');
const db = require('quick.db')

exports.run = function(client, message, args) {

let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

const botclubembed = new Discord.MessageEmbed().setDescription(`
:white_small_square: **${prefix}yardım-admin** Yetkililerin kullanabileceği komutları açar.
:white_small_square: **${prefix}yardım-kayıt** Kayıt komutlarını açar.
:white_small_square: **${prefix}yardım-kullanıcı** Kullanıcı komutlarını açar.
:white_small_square: **${prefix}yardım-görev** Görev komutlarını açar.
:white_small_square: **${prefix}yardım-ceza** Ceza komutlarını açar.
:white_small_square: **${prefix}yardım-ekonomi** Ekonomi komutlarını açar.
:white_small_square: **${prefix}yardım-eğlence** Eğlence komutlarını açar.
:white_small_square: **${prefix}yardım-logo** Logo komutlarını açar.
:white_small_square: **${prefix}yardım-yapımcı** Botun sahibi'nin kullanabileceği komutları açar.
:white_small_square: **${prefix}yardım-invite** Davet komutlarını açar.`)
.setTitle("Rabels")
.setFooter("Rabels")
return message.channel.send(botclubembed);

};

exports.conf = {
  enabled: true,
  aliases: ['help', 'helpe', 'hepl', 'yardm', 'yardim', 'y', 'h'],
  permLevel: 0,
};

exports.help = {
  name: "yardım"
};