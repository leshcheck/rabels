const Discord = require('discord.js')
const db = require('quick.db')
const emoji = require('../Referans/emojiler.json')
const ms = require('ms')

exports.run = async(client, message, args) => {

let user = message.author;
  
let cooldown = 86400000;
let cf = await db.fetch(`cfiştenebekliyonolmyaoff.${user.id}`);
if (cf !== null && cooldown - (Date.now() - cf) > 0) {
let time = ms(cooldown - (Date.now() - cf));
message.channel.send(`Günlük ödülünü tekrar alabilmek için **${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye** beklemelisin!`)
 } else {
let Para = args[0];
if(!(Para)) return message.reply("Lütfen Sayı giriniz!")

let kumarParaLimit = 50000;
if(!kumarParaLimit) return message.reply("**50.000** Para'dan fazla kullanılamaz!")



message.channel.send(`**${user.username}** harcanan ${emoji.ekonomiPTL} **${Para}** ve **kafaları** seçti
Para dönüyor... :coin: ${user+-Para ? `ve sen kazandın **${Para*2}!!**` : "ve hepsini kaybettin... :c"}
`)

}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cf", "coin-döndür", "coin-çarkdöndür"],
  kategori: "ekonomi",
  permlevel: 0
};

exports.help = {
  name: "coinflip",
  description: "Çark döndürerek para kazanırsınız."
}