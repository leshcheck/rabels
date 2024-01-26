const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args, config) => {
    var botclub = [`http://pubiza.com/api.php?uid=417622&url=${args[0]}`]
    if (!args[0]) {
        return message.channel.send('**Göndereceğin miktarı belirt!**')
    }
    if (message.content.includes('-')) {
        return message.channel.send('**Negatif harf giremezsin!**')
    }
var devtr = botclub[Math.floor(Math.random() * botclub.length)];
  const embed = new Discord.RichEmbed()
  .setTitle('Link başarıyla kısaltıldı.')
  .setURL(devtr)
  .setColor('GREEN')
  .setFooter('Rabels - Link Kısalt')
  .setDescription(`Link gireceğin sitenin içerisinde mevcut.`)
    message.author.send(embed)
message.channel.send('**Link başarıyla kısaltıldı, özel mesajlarınızı kontrol edin.**')   
      }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kısalt'],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'linkkısalt',
  description: 'Belirtilen linki kısaltır.',
  usage: 'linkkısalt'
};