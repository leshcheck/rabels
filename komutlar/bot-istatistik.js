const Discord = require('discord.js');
const ayarlar = require('../config.json');
const db = require('quick.db')
const moment = require('moment')
require("moment-duration-format")

exports.run = async(client, message, args) => {
  
const uptime = moment.duration(client.uptime).format("D [gün], H [saat], m [dakika], s [saniye]");
  
let embed = new Discord.MessageEmbed()
.setColor("RANDOM")

let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
let emoji = "**⇢**"
const botclubembed = new Discord.MessageEmbed()
.setDescription(`
**Geliştiriciler:**
<@739411430171738142> - \`Lyrixwx#6892, Lyrix\`

**Genel**
Çalışma süresi ${emoji} \`${uptime}\`
Komut sayısı ${emoji} \`${client.commands.size} Komut\`
Emoji sayısı ${emoji} \`${client.emojis.cache.size} Emoji\`
Kanal sayısı ${emoji} \`${client.channels.cache.size} Kanal\`
Sunucu sayısı ${emoji} \`${client.guilds.cache.size} Sunucu\`
Kullanıcı sayısı ${emoji} \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı [${message.client.users.cache.filter(m => m.bot).size} BOT]\`

**Gecikmeler**
Bot gecikmesi ${emoji} \`${client.ws.ping}ms\`
Mesaj gecikmesi ${emoji}  \`-${new Date().getTime() - message.createdTimestamp}ms\`

**Versiyonlar**
Discord.JS ${emoji} \`v${Discord.version}\`
Node.JS ${emoji} \`${process.version}\`
`)
.setTitle("Rabels")
.setFooter("Rabels")
return message.channel.send(botclubembed);




message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  aliases: ['i', 'ınfo', 'statictic', 'ı'],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: "istatistik",
  description: "Bot'un bilgilerini gösterir."
};