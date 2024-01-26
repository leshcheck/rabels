const botclub = require('discord.js');
const ayarlar = require('../config.json');
const system = require('../Referans/system.js')
var prefix = ayarlar.prefix

exports.run = async(botclb, btclb, btclub) => {

const botclubembed = new botclub.MessageEmbed()

.setTitle(`Bot Davet Menüsü`)
.setDescription(`
**Davet Linki:** [Davet Et!](${system.davetLinki})
**Destek Sunucusu:** [Destek!](${system.destekSunucusu})
`)
.setTimestamp()
.setFooter(`${btclb.author.username} Kullandı!`)
btclb.channel.send(botclubembed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['destek'],
  permLevel: 0,
  kategori: "kullanıcı"
};
exports.help = {
  name: 'davet',
  description: 'Botun linklerini atar.',
  usage: 'davet'
};