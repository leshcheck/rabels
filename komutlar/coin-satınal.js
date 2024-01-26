const Discord = require('discord.js')
const ayarlar = require('../config.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let user = message.author;
let coin = db.fetch(`coin.${message.guild.id}.${user.id}`) || 0;
let IDLER = ["bir", " iki", " üç", " dört"]

if(!coin) return message.channel.send(new Discord.MessageEmbed().setDescription(":warning: COIN PUANIN **"+ 0 +"** OLDUGU ICIN SATIN ALAMAZSIN!").setColor("#ff0000"))

  
if(args[0] === 'bir') {

let evt = new Discord.MessageEmbed()
.setDescription(`
Başarıyla \`10 Abone\` alındı!

FIYAT: \`6500 Coin\``)
message.channel.send({ embed: evt })
db.add(`coin.${message.guild.id}.${user.id}`, -6500)
db.set(`aboneistatistik.${message.author.id}.${message.guild.id}`, 6500 - 10)
}

if(args[0] === "iki") {
let evtT = new Discord.MessageEmbed()
.setDescription(`
Başarıyla \`30 Kayıt\` alındı!

FIYAT: \`8000 Coin\``)
db.add(`coin.${message.guild.id}.${user.id}`, -8000)
db.set(`kayıtsayısı.${message.author.id}.${message.guild.id}`, 8000 - 30)
message.channel.send({ embed: evtT })
}

if(args[0] === "üç") {
let evtTt = new Discord.MessageEmbed()
.setDescription(`
Başarıyla \`20 Davet\` alındı!

FIYAT: \`10.000 Coin\``)
message.channel.send({ embed: evtTt })
db.add(`coin.${message.guild.id}.${user.id}`, -10000)
db.set(`görevdavetet.${message.guild.id}.${user.id}`, 10000 - 20)
}

if(args[0] === "dört") {
let evtTt = new Discord.MessageEmbed()
.setDescription(`
Başarıyla \`100 Mesaj\` alındı!

FIYAT: \`16.100 Coin\``)
message.channel.send({ embed: evtTt })
db.add(`coin.${message.guild.id}.${user.id}`, -16100)
db.set(`görevmesajgönder.${message.guild.id}.${user.id}`, 16100 - 100)
} 
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["buy"],
  kategori: "coin",
  permlevel: 0
};

exports.help = {
   name: "satın-al",
   description: "Belirtilen ID'li item'i satın alır."
}