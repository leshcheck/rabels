const Discord = require('discord.js')
const ayarlar = require('../config.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setDescription(
":x: Bu komutu kullanabilmek için `MESAJLARI_YONET` iznine sahip olmalısın!"))

let user = message.mentions.users.first()
let içerik = args.join(" ")

if(!user) return message.channel.send(new Discord.MessageEmbed().setDescription(
":x: Uyarı verilecek kullanıcıyı etiketlemelisin!"))

if(!içerik) return message.channel.send(new Discord.MessageEmbed().setDescription(":x: Uyarı sebebini yazmalısın!"))

let botclub = new Discord.MessageEmbed()
.setTitle("BAŞARILI!")
.setDescription(`
**Başarıyla ${user.tag} adlı kullanıcı uyarıldı!**

Ceza İçeriği: **${içerik}**
Ceza Sayısı: **${db.fetch(`cezapuan.${message.guild.id}.${user.id}`) || "0"}**`)
message.channel.send({ embed: botclub })

db.add(`cezapuan.${message.guild.id}.${user.id}`, 1)
db.add(`warnpuan.${message.guild.id}.${user.id}`, 1)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["warn-uyarı", "warn"],
  permlevel: 0,
  kategori: "ceza"
};

exports.help = {
  name: "uyarı",
  description: "Belirtilen kullanıcıya uyarı verir."
}