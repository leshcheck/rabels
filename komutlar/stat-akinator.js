const Discord = require('discord.js')
const db = require('quick.db')


exports.run = async(client, message, args) => {

let user = message.author;
let evet = db.fetch(`akinatorevetsayısı_${message.guild.id}_${user.id}`)
let hayır = db.fetch(`akinatorhayırsayısı_${message.guild.id}_${user.id}`)
  
let botclb = new Discord.MessageEmbed().setTitle("Akinator Bilgi'lerin").setDescription(`
Toplam Oynama Sayın: **${evet+hayır || "0"}**
Evet Sayın: **${evet || "0"}**
Hayır Sayın: **${hayır || "0"}**

`)
message.channel.send({ embed: botclb })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["aki-stat", "aki-stats", "stat-aki", "stats-akinator", "stats-akinatör", "akinator-stats"],
  permlevel: 0,
  kategori: "stat"
};

exports.help = {
  name: "stat-akinator",
  description: "Akinatör Oynama bilgilerinizi gösterir."
}