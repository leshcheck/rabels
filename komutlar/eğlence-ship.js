const Discord = require("discord.js");

exports.run = async (client, message, args) => {

let k1 = message.guild.members.cache.filter(ce => !ce.user.bot).random()
let k2 = message.guild.members.cache.filter(ce => ce.id !== k1.id && !ce.user.bot).random()
let aşk = [
"Her yüreğin harcı değildir dokunmadan sevmek.",
"Bir umutla beklediğim en güzel yarınsın.",
"Aşk senin gülüşünde saklı…",
"Tam güldüğün yerde başlar şiirler.",
"Sen mi? Alırım bir ömür.",
"Seni sevmek için o kadar çok sebebim var ki… Sebepleri say desen haftalarca sürer sayamam.",
"Kanatlarım yok belki ama senin varlığının verdiği mutluluk ile göklerde uçuyorum."]
let cümle = aşk[Math.floor(Math.random()*aşk.length)] 
let oran = Math.floor(Math.random() * 30) + 70
let embed = new Discord.MessageEmbed()

.setTitle(' :white_heart: Yeni Bir Aşk! :white_heart:')
.setDescription(`\n\n${k1} & ${k2} İşte yüzdelik aşk diliminiz!!  **%${oran}**  💕 \n\n\`\`\`\n${cümle}\n\`\`\``) 
.setThumbnail("https://s8.gifyu.com/images/350dbbb67a4af512f06339db8e239159-45d26ecef48d71a5f.gif")
.setTimestamp()

message.channel.send(`Birbirine en uygun 2 kişiyi arıyorum...`).then(m =>{
setTimeout(k => m.edit(' ',embed)
,2000)})
}
  exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ['ship'],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: 'ship',
  description: '2 ismin 2 veya 3 harfleriyle birleştirir.',
  usage: 'ship'
}
