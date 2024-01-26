const botclub = require('discord.js');

exports.run = async (client, btclub, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return btclub.channel.send(new botclub.MessageEmbed().setDescription(`**Lütfen logosu yapılacak mesajı giriniz!**`))
  const botclublogo = `https://habbofont.net/font/steampunk/${yazi}.gif`
  .replace(' ', '+')

  
  const botclubembed = new botclub.MessageEmbed()
  .setTitle("Logonuz Hazır!")
  .setImage(botclublogo)
  .setFooter(`${btclub.author.username} Kulandı!`)
  .setTimestamp()
  btclub.channel.send(botclubembed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "logo"
}

exports.help = {
    name: 'altın',
    description: 'Yazdığınız yazıyı altın çevirir.',
    usage: 'altın <yazı>'
}