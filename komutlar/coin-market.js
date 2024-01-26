const Discord = require('discord.js')
const ayarlar = require('../config.json')
const db = require('quick.db')
const table = require("table")

exports.run = async(client, message, args) => {

let user = message.mentions.users.first() || message.author;
let coin = db.fetch(`coin.${message.guild.id}.${user.id}`) || 0;
let p = db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix;
  
let eMbEd = new Discord.MessageEmbed()
let ürünler = await eMbEd.setColor("RANDOM").setDescription(`\n
**${message.guild.name}** mağazasına hoş geldin ${user},
Burada kendine çeşitli eşyalar ve sunucumuz için işine yarayabilecek
belirli özelliklerden satın alabilirsin.

**Mağaza** (\`Bakiye: ${coin} 💵\`)
\`\`\`js
ID                        ITEM                    FIYAT
                        
#1                       10 Abone                6500 Coin
#2                       30 Kayıt                8000 Coin
#3                       20 Davet                10.000 Coin
#4                       100 Mesaj               16.100 Coin
\`\`\`

Satın almak için \`${p}satın-al ID\` komutunu kullanarak **item** alabilirsiniz.

#1: bir
#2: iki
#3: üç
#4: dört
`)

message.channel.send(ürünler)


  

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["coin-marcet"],
  kategori: "coin",
  permlevel: 0
};

exports.help = {
   name: "coin-market",
   description: "Coin ile market'ten item satın alabilmeye yarar."
}