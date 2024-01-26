const Discord = require('discord.js');
const ayarlar = require('../config.json');
const emoji = require('../Referans/emojiler.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
  
let user = message.mentions.users.first() || message.author;

  const veri = db.get(`cezapuan.${message.guild.id}.${user.id}`) || "0";
function progressBar (value, maxValue, size) {
        const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
        const emptyProgress = size - progress > 0 ? size - progress : 0;
         let progressStart;
            if(veri !== 0) progressStart = `${emoji.başlangıcBar}`
            if(veri > 0) progressStart = `${emoji.başlamaBar}`
             const progressText = `${emoji.doluBar}`.repeat(progress);
             const emptyProgressText = `${emoji.boşBar}`.repeat(emptyProgress)
             const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${emoji.doluBitişBar}` : `${emoji.boşBitişBar}`}`;
        return bar;
      };
  
let durum = user.presence.status.toString().replace("dnd", "<:rahatsizetme:856532284467314698> \`Rahatsız Etmeyin\`").replace("online", "<:cevrimici:856532248623185920> \`Çevrimiçi\`").replace("idle", "<:bosta:856532313730842635> \`Boşta\`").replace("offline", "<:cevrimdisi:856532210450694145> \`Çevrimdışı\`")

let oluşturulma = moment(user.createdAt).format("\`LLL\`").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)
.replace("AM", "Öğlenden Sonra").replace("PM", "Öğlenden Önce")

let katılım = `\`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= message.guild.members.cache.get(user.id).joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\``;

let giriş = moment(user.joinedAt).format("\`LLL\`").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)
.replace("PM", "Öğlenden Önce").replace("AM", "Öğlenden Sonra")
let takmaNick = `\`${user.username}, ${user.nickname, "" || "[Yok]"}\``;

let a = "\`+\`";
let cpuan = db.get(`cezapuan.${message.guild.id}.${user.id}`)
let wpuan = db.get(`warnpuan.${message.guild.id}.${user.id}`) || "0";
let jpuan = db.get(`jailpuan.${message.guild.id}.${user.id}`) || "0";
let mpuan = db.get(`mutepuan.${message.guild.id}.${user.id}`) || "0";

const embed = new Discord.MessageEmbed()
.setAuthor(user.tag, user.avatarURL())
.setDescription(`
**Kullanıcı Bilgisi;**
${a} Kullanıcı Adı: \`${user.username}\`
${a} Kullanıcı ID: \`${user.id}\`
${a} Durumu: ${durum}
${a} Oluşturulma Tarihi: ${oluşturulma}
${a} Katılım Sırası: ${katılım}

**Üye Bilgisi;**
${a} Sunucuya Giriş Tarihi: ${giriş}
${a} Takma İsim: ${takmaNick}
${a} Aldığı Cezalar: \`${wpuan}\` **adet uyarı**, \`${jpuan}\` **adet jail**, \`${mpuan}\` **adet mute**.
${a} Ceza Puanı: **${cpuan || "`0 (O bir melek)`"}**
${progressBar(cpuan, 100, 9)} \`${cpuan || 0}%\`
`)

 message.channel.send({ embed: embed });

};

exports.conf = {
  enabled: true,
  aliases: ['ceza-profil', 'ceza-puanım', 'ceza'],
  permLevel: 0,
  kategori: "ceza"
};

exports.help = {
  name: "ceza-puan",
  description: "Ceza puanınıza bakarsınız."
};