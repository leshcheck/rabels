const Discord = require('discord.js')
const ayarlar = require('../config.json')


exports.run = (client, message, args) => {
  
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
.setDescription(":exclamation: Bu komutu kullanmak için `MESAJLARI_YONET` iznine sahip olmalısın!"))

let mesaj = args[1];
let zaman = args[0];
  
if(!zaman) return message.channel.send(new Discord.MessageEmbed()
.setDescription(":x: Bir zaman belirtmelisin!\n\n**KULLANIMLAR/VAKIT:**\n `Herşeyi ms olarak girmelisin`"))
  
if(!mesaj) return message.channel.send(new Discord.MessageEmbed()
.setDescription(":x: Bir mesaj belirtmelisin!"))

let botclubEMBED = new Discord.MessageEmbed()
.setTitle(":white_check_mark: BAŞARILI!")
.setDescription(`\n
Hatırlatıcı/Zamanlayıcı başarıyla ayarlandı.

Zaman: \`${zaman}sn\`
Mesaj: \`${mesaj}\``)

setInterval(function () {
message.channel.send(`${mesaj}`)
}, zaman)

message.channel.send({ embed: botclubEMBED})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["timer"],
  permlevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: "zamanlayıcı",
  description: "Belirtilen zaman içinde bir hatırlatıcı oluşturur."
}