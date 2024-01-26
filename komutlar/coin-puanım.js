const Discord = require('discord.js')
const db = require('quick.db')
const emoji = require("../Referans/emojiler.json")
const Database = require("../VERILER/Database")
const vdb = new Database("Database", "Voice")
const mdb = new Database("Database", "Message")
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args, value) => {

  let user = message.mentions.users.first() || message.author;
  
  
  let voiceData = vdb.get(`stats.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
  let messageData = mdb.get(`stats.${message.guild.id}.${user.id}`) || {messages: 0, channels: {}};
  /////////////////////////////////////////////    SES     \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  let voiceList = Object.keys(voiceData.channels).map(vd => { 
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);

  let vL = Object.keys(voiceData.channels).map(vd => { 
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);
  
voiceList = voiceList.length > 1 ? voiceList.splice(0, 1) : voiceList;
voiceList = voiceList.map((vd, index)=> `\`${moment.duration(vd.Total).format("H [saat], m [dakika], s [saniye]")}\``).join("\n");
  
vL = vL.length > 1 ? vL.splice(0, 1) : vL;
vL = vL.map((vd, index)=> `\`${moment.duration(vd.Total+7).format("H [saat], m [dakika], s [saniye]")}\``).join("\n");
  
  /////////////////////////////////////////////    MESAJ     \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    let messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);

  
  let mL = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);
  

messageList = messageList.length > 1 ? messageList.splice(0, 1) : messageList;
messageList = messageList.map((md, index)=> `${md.Total} mesaj`).join("\n");

mL = mL.length > 1 ? mL.splice(0, 1) : mL;
mL = mL.map((md, index)=> `${md.Total+7} mesaj`).join("\n");

let aboneSayısı = db.fetch(`aboneistatistik.${user.id}`) || 0;
let coin = db.fetch(`coin.${message.guild.id}.${user.id}`) || 0;

let gerekenBe = "100000"


    const veri = db.get(`coin.${message.guild.id}.${user.id}`)
function progressBar (value, maxValue, size) {
  
        const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
        const emptyProgress = size - progress > 0 ? size - progress : 0;
         let progressStart;
            if(veri !== 0) progressStart = `${emoji.başlangıcBar}` // Dolu Başlangıç Bar
            if(veri > 0) progressStart = `${emoji.başlamaBar}` // Boş Başlangıç Bar
             const progressText = `${emoji.doluBar}`.repeat(progress); // Dolu Bar
             const emptyProgressText = `${emoji.boşBar}`.repeat(emptyProgress) // Boş Bar
const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${emoji.doluBitişBar}`/*Dolu Bitiş Bar*/ : `${emoji.boşBitişBar}`/*Boş Bitiş Bar*/}`
        return bar;
      };

const puanBari = `${progressBar(coin, gerekenBe, 9)} \`${coin} / ${gerekenBe}\``
  
let atlanıcakRol = "857364435944603668"
let şimdikiRol = message.member.roles.highest

let yDurumu;
if (şimdikiRol) { yDurumu = `Şu anda ${şimdikiRol} rolündesin, <@&${atlanıcakRol}> rolüne ulaşmak için \`${gerekenBe-coin}\` coin kazanman gerek.` };
if (atlanıcakRol == şimdikiRol) yDurumu = `Şu anda **son yetki**'desin.`;
/*
   if(!coin) {
  if(coin => 10000) {
    let member = user;
  member.addRole('857364435944603668')
  return;
  }}*/
  
let embed = new Discord.MessageEmbed()
.setAuthor(user.username, user.avatarURL())
.setThumbnail(user.avatarURL())
.setDescription(`
**Abone Rolü Verdiği Kullanıcı Sayısı:** ${aboneSayısı}

**Coin: ${coin}    Gereken: ${gerekenBe}**
${puanBari}

**                                                                                           YETKI DURUMU **

${yDurumu}`)
.addField("Ses Verileri", `
**:loud_sound: | Haftalık: ${vL || "`0 saniye`"}**
**:loud_sound: | Günlük: ${voiceList || "`0 saniye`"}**`, true)
.addField("Mesaj Verileri", `
**:speech_left: | Haftalık: ${mL}**
**:speech_left: | Günlük: ${messageList}**`, true)
message.channel.send({ embed: embed })
//db.add(`coin.${message.guild.id}.${user.id}`, 50000)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["coin-profil"],
  permlevel: 0,
  kategori: "coin"
};

exports.help = {
  name: "coin",
  description: "Coin ile ilgili bilgiler verir."
}