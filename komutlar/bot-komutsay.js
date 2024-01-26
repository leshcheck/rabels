const Discord = require('discord.js');
const emoji = require('../Referans/emojiler.json')
exports.run = (client, botclub, args, message) => {
  
  
  
    const veri = client.commands.size || 0

    let mesaj = args.slice(0).join(' ');
    const embed = new Discord.MessageEmbed()
    .setDescription(`
** Bot'ta Toplam** \`${veri}\` **Komut Bulunuyor. **
    `)
    .setFooter(`${botclub.author.username} Kullandı`)
    .setTimestamp()
    return botclub.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands", "komutsay"],
  permLevel: 0,
  kategori: "kullanıcı"
};
exports.help = {
  name: 'komutsay',
  description: 'Komutları sayar.',
  usage: 'komutlar',
};  
