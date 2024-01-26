const Discord = require('discord.js')
const ayarlar = require('../config.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
let user = message.author
let kanal = message.mentions.channels.first()
  
if(args[0] !== 'ayarla' && args[0] !== 'sıfırla') return message.channel.send(new Discord.MessageEmbed().setDescription(`
:x: Lütfen **${prefix}invite-kanal ayarla** veya **${prefix}invite-kanal sıfırla** yaz.`))

if(args[0] === "ayarla") {
  
if(!kanal) return message.channel.send(new Discord.MessageEmbed().setDescription(
":warning: Davet kanalı ayarlamak için lütfen kanal etiketleyiniz!").setColor("#ff0000"));

let başarılı = new Discord.MessageEmbed()
.setDescription(`:white_check_mark: Davet kanal'ını ${kanal} olarak ayarladım.`)
db.set(`davetKanali_${user}`, kanal)
message.channel.send({ embed: başarılı })
};

if(args[0] === "sıfırla") {

let evet = new Discord.MessageEmbed()
.setDescription(`:white_check_mark: Davet kanal'ını sıfırladım!`)
db.delete(`davetKanali_${user.id}`, kanal)
message.channel.send({ embed: evet })
}

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["invitee-channel", "davet-kanal"],
  kategori: "yetkili",
  permlevel: 0
};

exports.help = {
  name: "invite-kanal",
  description: "Davet kanalı'nı ayarlar/sıfırlar."
}