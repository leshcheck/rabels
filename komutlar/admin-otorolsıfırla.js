const Discord = require('discord.js');
const db = require('quick.db') 
const ayarlar = require('../config.json');
exports.run = (client, message, args) => {

if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`))

  if(!db.fetch(`otorolkanal_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription('Bu özellik zaten kapalı!'))
   

   message.channel.send(new Discord.MessageEmbed().setTitle(`İşlem Başarılı!`).setTimestamp().setFooter(`${message.author.username} Kullandı!`).setDescription('Otorol sistemi başarıyla kapatıldı!'))
db.delete(`otorolkanal_${message.guild.id}`)   
db.delete(`otorolrol_${message.guild.id}`)

}; 

exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: [], 
permLevel: 0,
  kategori: "yetkili"
}

exports.help = {
 name: 'otorol-sıfırla', 
description: 'Otorol sıfırlar.',
 usage: 'otorol-sıfırla' 
};