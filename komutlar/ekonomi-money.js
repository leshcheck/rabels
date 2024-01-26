const Discord = require("discord.js")
const db = require("quick.db")
const emoji = require("../Referans/emojiler.json")

exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || message.author;
let botclubMoney = db.fetch(`ekonomiMoney.${user.id}`);
message.channel.send(`**${emoji.ekonomiPTL} | ${user.tag}**, şu anda __**${botclubMoney || 0}**__ paraya sahipsin!`);
//  botclub.add(`money.${izexleshXbotclubmember.id}`, 10000)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["param","para"],
  permLevel: 0,
  kategori: "ekonomi"
};

exports.help = {
  name: "money",
  description: "Paranıza bakarsınz",
  usage: "!money & !param & !para ile bakabilirsiniz"
};