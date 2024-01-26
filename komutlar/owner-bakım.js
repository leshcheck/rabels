const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../config.json")
exports.run = async (client, message, args) => {

  if(message.author.id !== ayarlar.sahip) {
    const embed = new Discord.MessageEmbed()
    .setDescription(`**:x: Bu Komut Yapımcıma Özeldir !**`)
    .setColor('BLUE')
    return message.channel.send(embed).then(msg=>msg.delete(5000));
    }
if(args[0] === "aç"){
  if(!args[1]){
  message.channel.send('Bakım modu sebebini belirtin!')
  }
  db.set('bakım', args.slice(1).join(' '))
  if (args.slice(1).join(' ')) {
  message.channel.send("Bakım açıldı")
    }
} else if(args[0]=== "kapat"){
  message.channel.send("Bakım Kapatıldı")
  db.delete('bakım')
}

}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bakım'],
  permLevel: 0,
  kategori: "sahip"
};

exports.help = {
  name: 'bakım',
  description: 'Bakım açar kapatır.',
  usage: 'Bakım'
};