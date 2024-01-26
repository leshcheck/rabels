const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => {
  const aboneyetkilisi = await db.fetch(`aboneyetkilisi_${message.guild.id}`)
  const botclubabone = await db.fetch(`abonek_${message.guild.id}`)
  const container = db.fetch(`aboneistatistik.${message.author.id}`)
  
  if(botclubabone == null) return message.channel.send(new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription('Abone kanalı ayarlanmamış!'));
  if (message.channel.id !== botclubabone) return message.channel.send(new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription(`Bu komutu sadece <#${botclubabone}> kanalında kullanabilirsiniz!`));
  if (botclubabone == true) return; 
  if (botclubabone == false) return message.channel.send(new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription(`Bu sunucuda abone sistemi aktif edilmemiş!`));
  
 if(!message.member.roles.cache.has(db.fetch(`aboneyetkilisi_${message.guild.id}`))) {
    return message.channel.send(new Discord.MessageEmbed().setTitle(`Yetersiz Yetki!`).setDescription(`Bu komutu kullanabilmek için <@&${aboneyetkilisi}> yetkisine sahip olmalısın!`));
 }
  let user = message.mentions.members.first()
   if (!user) return message.channel.send(new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription('Kime rol vereceğimi yazmadın!')).catch(console.error);
   if (user.roles.cache.has(db.fetch(`abonerolü_${message.guild.id}`))) return message.channel.send(new Discord.MessageEmbed().setTitle(`Olamaz Bir Hata!`).setDescription("Bu kullanıcıda zaten abone rolü var!"))
  user.roles.add(db.fetch(`abonerolü_${message.guild.id}`))
  const embed = new Discord.MessageEmbed()
  .setTimestamp()
  .setTitle(`İşlem Başarılı!`)
  .setFooter('Abone Sistemi')
  .addField(`Abone Rolü Alan Kullanıcı;`, `${user}`,true)
  .addField(`Abone Rolü Veren Yetkili;`,`${message.author}`,true)
      message.channel.send(embed)
  db.add(`c`, 1)
  if(!container.length > 2 ? db.add(`coin.${message.guild.id}.${user.id}`, 50) : container);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['a']
};

exports.help = {
  name: "abone",
  description: "Abone Rolü Verir!",
  usage: "abone"
};