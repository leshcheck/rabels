const botclubnet = require('discord.js')
const ayarlar = require('../config.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new botclubnet.MessageEmbed().setTitle(`Yetersiz Yetki!`).setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`))
  
let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
let channel = message.mentions.channels.first()
let sayi = args[1];

if(args[0] !== 'ayarla' && args[0] !== 'sıfırla') return message.channel.send(new botclubnet.MessageEmbed().setDescription(`
:x: Lütfen **${prefix}sayaç ayarla** veya **${prefix}sayaç sıfırla** yaz.`))

if(args[0] === 'ayarla') {
if(!sayi) return message.channel.send(new botclubnet.MessageEmbed().setDescription(":x: Hedef girmelisin!"))
if(!channel) return message.channel.send(new botclubnet.MessageEmbed().setDescription(":x: Bir kanal etiketlemelisin!"))
  
let botclub = new botclubnet.MessageEmbed()
.setTitle("Başarılı!")
.setDescription(`Sayaç kanalını ${channel}, Hedefi ise **${sayi}** olarak ayarladım.`)
message.channel.send({ embed: botclub });

db.set(`sayac.${message.guild.id}`, channel, sayi)
};

if(args[0] === 'sıfırla') {
let botclub = new botclubnet.MessageEmbed()
.setTitle("Başarılı!")
.setDescription(`Otorol sistemi başarıyla yok edildi!`)
message.channel.send({ embed: botclub });
db.delete(`sayac.${message.guild.id}`)
};

};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permlevel: 0,
 kategori: "yetkili"
};

exports.help = {
  name: "sayaç",
  description: "Sayaç ayarlar sıfırlar."
}