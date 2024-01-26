const Discord = require('discord.js');
const Database = require('../VERILER/Database')
const vt = new Database("Database", "Voice")
const mdb = new Database("Database", "Message")
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {

let voiceData = vt.get(`stats.${message.guild.id}.${message.author.id}`) || {voice: 0, channels: {}};
let messageData = mdb.get(`stats.${message.guild.id}.${message.author.id}`) || {messages: 0, channels: {}};
let voiceList = Object.keys(voiceData.channels).map(vd => { 
      return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);

let messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);

    voiceList = voiceList.length > 5 ? voiceList.splice(0, 5) : voiceList;
    voiceList = voiceList.map((vd, index)=> `${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");
  
    messageList = messageList.length > 5 ? messageList.splice(0, 5) : messageList;
    messageList = messageList.map((md, index)=> `${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} mesaj\``).join("\n");

  
  
  
  

let user = message.author;
  
user.dc = moment(user.createdAt).format("LL (DD/MM/YYYY)").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)

user.sw = moment(user.joinedAt).format("LL (DD/MM/YYYY)").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)

let embed = new Discord.MessageEmbed()
.setColor("#fffdd0")
.setDescription(`
**${user.tag} Kullanıcısı'nın bilgileri.**

**İsmi** \`${user.tag}\`
**ID/kimlik** \`${user.id}\`
**Katılma (Discord)** \`${user.dc}\`
**Katılma (Sunucu)** \`${user.sw}\``)
.addField(
"MESAJ VERISI", `
${messageList}`, true)
.addField(
"SES VERISI", `
${voiceList}`, true)
/*
**MESAJ VERISI**                                                                       **SES VERISI**
${messageList}                                                                    ${voiceList}*/
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  aliases: ['stat-kullanıcı', 'stat-user', 'kullanıcı-bilgi'],
  permLevel: 0,
  kategori: "stat"
};

exports.help = {
  name: "stat-info",
  description: "Kullanıcı'nın bilgilerini gösterir."
};


/*
let voiceData = vdb.get(`stats.${message.guild.id}.{message.author.id}`) || {voice: 0, channels: {}};
    let messageData = mdb.get(`stats.${message.guild.id}.${message.author.id}`) || {messages: 0, channels: {}};
    let voiceList = Object.keys(voiceData.channels).map(vd => { 
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);

    let messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);

voiceList = voiceList.length > 5 ? voiceList.splice(0, 5) : voiceList;
voiceList = voiceList.map((vd, index)=> `${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat], m [dakika], s [saniye]")}\``)
  
messageList = messageList.length > 5 ? messageList.splice(0, 5) : messageList;
messageList = messageList.map((md, index)=> `${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} mesaj\``).join("\n");
  
  

let user = message.mentions.users.first() || message.author;
user.dc = moment(user.createdAt).format("LL (DD/MM/YYYY)").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)

.replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)
  
user.sw = moment(user.joinedAt).format("LL (DD/MM/YYYY)").replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)

.replace("January", `Ocak`).replace("February", `Şubat`).replace("March", `Mart`).replace("April", `Nisan`).replace("May", `Mayıs`).replace("June", `Haziran`).replace("July", `Temmuz`).replace("August", `Ağustos`).replace("September", `Eylül`).replace("October", `Ekim`).replace("November", `Kasım`).replace("December", `Aralık`)
  
let embed = new Discord.MessageEmbed()
.setColor("#fffdd0")
.setDescription(`
**${user.tag} Kullanıcısı'nın bilgileri.**

**İsmi** \`${user.tag}\`
**ID/kimlik** \`${user.id}\`
**Katılma (Discord)** \`${user.dc}\`
**Katılma (Sunucu)** \`${user.sw}\`

                            **MESAJ**                                                                       **SES**
${messageList}                                                                    ${voiceList}
`)

message.channel.send({ embed: embed })
};

*/