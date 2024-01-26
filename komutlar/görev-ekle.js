const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../config.json')
const moment = require('moment')
exports.run = async(client, message, args) => {
  

  
  
let görev = args.slice(2).join(" ");
let ödül = args[1];


let user = message.mentions.users.first();
if(!user) return message.channel.send(new Discord.MessageEmbed().setDescription(
":x: Görev eklenecek kullanıcıyı etiketlemelisin!"))
if(!görev) return message.channel.send(new Discord.MessageEmbed().setDescription(
":x: Görevi girmelisin!"))
if(!ödül) return message.channel.send(new Discord.MessageEmbed().setDescription(
":x: Kullanıcı görevini yaptına verilecek ödül!"))

  
let bşrl = new Discord.MessageEmbed()
.setDescription(`Görev başarıyla eklendi!`)
message.channel.send(bşrl).then(msg=>msg.delete < 2000);
let bsrl = new Discord.MessageEmbed()
.setDescription(`Görev ödülü başarıyla eklendi!`)
message.channel.send(bsrl).then(msy=>msy.delete < 2000);
  
let görevv = new Discord.MessageEmbed()
.setDescription(`**GOREV BILGILERI**

**Görevi ekleyen yetkili: ${message.author}**
**Görev eklenen: ${user}**
**Görev:** \`${görev}\`
**Ödül:** ${ödül}`)
message.channel.send(görevv)
db.set(`görev_${message.guild.id}_${user.id}`, görev)
db.set(`görevodulu_${message.guild.id}_${user.id}`, ödül)
db.add(`görevsayısı_${message.guild.id}_${user.id}`, 1)
};

exports.conf = {
  enabled: true,
  aliases: ['task-add'],
  permLevel: 0,
  kategori: "görevv"
};

exports.help = {
  name: "görev-ekle",
  description: "Bot bulunduğunuz odaya girer.",
  usage: "seviye-yardım",
};