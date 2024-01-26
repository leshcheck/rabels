const Discord = require('discord.js');


exports.run = async (client, message, args) => {

let embed = new Discord.MessageEmbed().setColor("#2f3031").setDescription(`
Pingim **${client.ws.ping}ms**
Mesaj Pingim **-${new Date().getTime() - message.createdTimestamp}ms**`)
message.channel.send({ embed: embed })
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'ping',
  description: 'Botun pinglerini gösterir.',
  usage: 'ping'
};