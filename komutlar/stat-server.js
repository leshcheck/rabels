const Discord = require('discord.js');
const ayarlar = require('../config.json');
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {


let server = message.guild;

let embed = new Discord.MessageEmbed()
.setDescription(`
**${server.name} adlı sunucu'nun bilgileri**

**İsmi** \`${server.name}\`
**Sahip** ${server.owner}
**ID/kimlik** \`${server.id}\`
**Bölge** \`${server.region}\`
**Oluşturulma** \`${moment(server.createdAt).format("LL (DD/MM/YYYY)").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)}\`
**İsim kısaltması** \`${server.nameAcronym}\`

**Kanal sayısı** \`${server.channels.cache.filter(c => c.type === 'text').size}\`
**Ses Kanal sayısı** \`${server.channels.cache.filter(c => c.type === 'voice').size}\`
**Kategori sayısı** \`${server.channels.cache.filter(c => c.type === 'category').size}\`
**Rol sayısı** \`${server.roles.cache.size}\`

**Üye sayısı** \`${server.memberCount}\`
**Gerçek Üye sayısı** \`${server.memberCount - server.members.cache.filter(m => m.user.bot).size}\`
**Bot sayısı** \`${server.members.cache.filter(m => m.user.bot).size}\`

`) 
message.channel.send({ embed: embed })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-bilgi", 'sunucu-info', 'bilgi-server'],
  permlevel: 0,
  kategori: "stat"
};

exports.help = {
  name: "stat-server",
  description: "Sunucu'nun bilgilerini gösterir."
}

/*const Discord = require('discord.js')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, args, message) => {

let server = message.guild;

let embed = new Discord.MessageEmbed()
.setDescription(`
**${server.name} adlı sunucu'nun bilgileri**

**İsmi** \`${server.name}\`
**Sahip** ${server.owner}
**ID/kimlik** \`${server.id}\`
**Bölge** \`${server.region}\`
**Oluşturulma** \`${moment(server.createdAt).format("LL (DD/MM/YYYY)").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)}\`
**İsim kısaltması** \`${server.nameAcronym}\`

**Kanal sayısı** \`${server.channels.cache.filter(c => c.type === 'text').size}\`
**Ses Kanal sayısı** \`${server.channels.cache.filter(c => c.type === 'voice').size}\`
**Kategori sayısı** \`${server.channels.cache.filter(c => c.type === 'category').size}\`
**Rol sayısı** \`${server.roles.cache.size}\`

**Üye sayısı** \`${server.memberCount}\`
**Gerçek Üye sayısı** \`${server.memberCount - server.members.cache.filter(m => m.user.bot).size}\`
**Bot sayısı** \`${server.members.cache.filter(m => m.user.bot).size}\`

`) 
message.channel.send({ embed: embed })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-bilgi", 'sunucu-info', 'bilgi-server'],
  permlevel: 0,
  kategori: "stat"
};

exports.help = {
  name: "stat-server",
  description: "Sunucu'nun bilgilerini gösterir."
}*/