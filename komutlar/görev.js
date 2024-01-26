const Discord = require("discord.js");
const ayarlar = require("../config.json");
const emoji = require("../Referans/emojiler.json")
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, voice, guild, args) => {
//if(!message.member.roles.cache.has("846061188755488789")) return message.channel.send(new Discord.MessageEmbed().setDescription("GOREV YOK!"))

let user = message.mentions.users.first() || message.author;
/*
  if (!user)
    return message.channel.send(new Discord.MessageEmbed()
.setDescription(`:warning: Görevlerine bakılacak kullanıcıyı etiketle!`));
*/
////////////////////////////////        BAR         \\\\\\\\\\\\\\\\\\\\\\\\\\\\\


function mesajBari (value, maxValue, size) {
  const veri = db.fetch(`görevmesajgönder.${message.guild.id}.${user.id}`)
        const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
        const emptyProgress = size - progress > 0 ? size - progress : 0;
         let progressStart;
            if(veri !== 0) progressStart = `${emoji.başlangıcBar}`
            if(veri > 0) progressStart = `${emoji.başlamaBar}`
             const progressText = `${emoji.doluBar}`.repeat(progress);
             const emptyProgressText = `${emoji.boşBar}`.repeat(emptyProgress)
             const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${emoji.doluBitişBar}` : `${emoji.boşBitişBar}`}`;
        return bar;
}
  
function davetBari (value, maxValue, size) {
  const ver = db.fetch(`görevdavetet.${message.guild.id}.${user.id}`)
        const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
        const emptyProgress = size - progress > 0 ? size - progress : 0;
         let progressStart;
            if(ver !== 0) progressStart = `${emoji.başlangıcBar}`
            if(ver > 0) progressStart = `${emoji.başlamaBar}`
             const progressText = `${emoji.doluBar}`.repeat(progress);
             const emptyProgressText = `${emoji.boşBar}`.repeat(emptyProgress)
             const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${emoji.doluBitişBar}` : `${emoji.boşBitişBar}`}`;
        return bar;
}
  
function aboneBari (value, maxValue, size) {
  const ve = db.fetch(`aboneistatistik.${message.author.id}`)
        const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
        const emptyProgress = size - progress > 0 ? size - progress : 0;
         let progressStart;
            if(ve !== 0) progressStart = `${emoji.başlangıcBar}`
            if(ve > 0) progressStart = `${emoji.başlamaBar}`
             const progressText = `${emoji.doluBar}`.repeat(progress);
             const emptyProgressText = `${emoji.boşBar}`.repeat(emptyProgress)
             const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${emoji.doluBitişBar}` : `${emoji.boşBitişBar}`}`;
        return bar;
}

function kayıtBari (value, maxValue, size) {
  const v = db.fetch(`kayıtsayısı.${message.author.id}.${message.guild.id}`)
        const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
        const emptyProgress = size - progress > 0 ? size - progress : 0;
         let progressStart;
            if(v !== 0) progressStart = `${emoji.başlangıcBar}`
            if(v > 0) progressStart = `${emoji.başlamaBar}`
             const progressText = `${emoji.doluBar}`.repeat(progress);
             const emptyProgressText = `${emoji.boşBar}`.repeat(emptyProgress)
             const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${emoji.doluBitişBar}` : `${emoji.boşBitişBar}`}`;
        return bar;
}

////////////////////////////////        KOMUT         \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let görev = {
bir: "Günde 500 mesaj gönder.",
iki: "Sunucu'ya 35 kişi davet et.",
uc: "60 Kişiye abone rolü ver.",
dort: "40 Kişiyi kayıt et."
}

let ödül = {
bir: "30.000 Coin",
iki: "50.000 Coin",
uc: "100.000 Coin",
dort: "400.000 Coin"
}


              let görevMesajGönder = db.fetch(`görevmesajgönder.${message.guild.id}.${user.id}`) || "0";
              let görevDavetEt = db.fetch(`görevdavetet.${message.guild.id}.${user.id}`) || "0";
              let görevAboneRolüVer = db.fetch(`aboneistatistik.${message.author.id}`) || "0";
              let görevKayıtEt = db.fetch(`kayıtsayısı.${message.author.id}.${message.guild.id}`) || "0";
  

 if(görevMesajGönder === 30000) {db.add(`coin.${message.guild.id}.${user.id}`, 30000)}
 if(görevDavetEt === 35) { db.add(`coin.${message.guild.id}.${user.id}`, 50000)}
 if(görevAboneRolüVer === 60) {db.add(`coin.${message.guild.id}.${user.id}`, 100000)}
 if(görevKayıtEt === 40) {db.add(`coin.${message.guild.id}.${user.id}`, 400000)}
  
//-----------------------------------------------------------------------------------------------------------------------------------------\\
/*let gMG;
let gDE;
let gARV;
let gKE;
//-----------------------------------------------------------------------------------------------------------------------------------------\\
const coin = db.fetch(`coin.${message.guild.id}.${user.id}`)
if(görevMesajGönder = 500) {gMG = `${görevMesajGönder} / 500`}
if(görevDavetEt = 35) {gDE = `${görevDavetEt} / 35`}
if(görevAboneRolüVer = 60) {gARV = `${görevAboneRolüVer} / 60`}
if(görevKayıtEt = 40) {gKE = `${görevKayıtEt} / 40`}

if(görevMesajGönder === 500) {gMG = "Tamamlandı!"}
if(görevDavetEt === 35) {gDE = "Tamamlandı!"}
if(görevAboneRolüVer === 60) {gARV = "Tamamlandı!"}
if(görevKayıtEt === 40) {gKE = "Tamamlandı!"}
*/
let gmg;
if(görevMesajGönder === 500) {gmg = "Tamamlandı!"}
if(görevMesajGönder) {gmg = görevMesajGönder+" / 500"}
//-----------------------------------------------------------------------------------------------------------------------------------------\\
  
let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${user.username} kullanıcısı'nın görev bilgileri`)
    .setDescription(`

**${görev.bir}**
${mesajBari(görevMesajGönder, 500, 9)} \`${gmg}\`
Ödül: \`${ödül.bir}\`

**${görev.iki}**
${davetBari(görevDavetEt, 35, 9)} \`${görevDavetEt+" / 35"}\`
Ödül: \`${ödül.iki}\`

**${görev.uc}**
${aboneBari(görevAboneRolüVer, 60, 9)} \`${görevAboneRolüVer+" / 60"}\`
Ödül: \`${ödül.uc}\`

**${görev.dort}**
${kayıtBari(görevKayıtEt, 40, 9)} \`${görevKayıtEt+" / 40"}\`
Ödül: \`${ödül.dort}\`

:bell: **Bilgilendirme:** \n Günlük görevlerini tamamlamadığın zaman ödülün verilecektir!
`)

  message.channel.send(embed);

  /*
  Görev 📋 - Ödül 🎉 - Sayı 🔢 - Tamamlama Oranı 📊
  
🔢: **${db.has(`görevsayısı_${message.guild.id}_${user.id}`) ? `${db.fetch(`görevsayısı_${message.guild.id}_${user.id}`)}` : "Görev eklenmediği için gösterilemiyor!"}**

📋: **${db.has(`görev_${message.guild.id}_${user.id}`) ? `${db.fetch(`görev_${message.guild.id}_${user.id}`)}` : "Görev eklenmediği için gösterilemiyor!"}** 
:bar_chart:: 
🎉: **${db.has(`görevodulu_${message.guild.id}_${user.id}`) ? `${db.fetch(`görevodulu_${message.guild.id}_${user.id}`)}` : "Görev eklenmediği için gösterilemiyor!"}**
  */
};

exports.conf = {
  enabled: true,
  aliases: ['tasks'],
  permLevel: 0,
  kategori: "görev"
};

exports.help = {
  name: "görev",
  description: "Görevlerinizi gösterir."
};