const Discord = require('discord.js');
const ayarlar = require('../config.json');
exports.run = (client, botclub, params) => {
      
      const embed = new Discord.MessageEmbed()
    .setAuthor('Koca Yürekli ' + botclub.author.username + ' Herkese Çay Aldı!')
    .setTimestamp()
    .setFooter(`${botclub.author.username} Kullandı!`)
    .setImage(`https://images-ext-2.discordapp.net/external/Cch33UkRxcy5CstqP5Cvt6q52z6QPsT9tNNHeWXPmUM/http/i.hizliresim.com/PMQ7od.gif`)
    return botclub.channel.send(embed);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['herkese-çay'],
  permLevel: 0,
  kategori: "eğlence"
};
exports.help = {
  name: 'herkeseçay',
  description: 'Herkese Çay Verir',
  usage: 'herkeseçay'
};
