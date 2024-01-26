const Discord = require('discord.js');
exports.run = (client, botclub, args) => {
    let mesaj = args.slice(0).join(' ');
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${mesaj}`+botclub.author.username + ' FBI Open the door !**')
    .setImage(`https://thumbs.gfycat.com/CriminalSilentKingbird-size_restricted.gif `)
    .setFooter(`${botclub.author.username} Kullandı`)
    .setTimestamp()
    return botclub.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "eğlence"
};
exports.help = {
  name: 'fbi',
  description: 'Sizi fbi basar.',
  usage: 'fbi',
};  

