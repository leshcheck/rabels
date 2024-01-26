const botclub = require('discord.js');

exports.run = async (client, btclub, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return btclub.channel.send(new botclub.MessageEmbed().setDescription(`**Lütfen logosu yapılacak mesajı giriniz!**`))
  const botclublogo = `https://dynamic.brandcrowd.com/asset/logo/1a2ebc7a-1b24-466a-bee7-9a0e8f5d8395/logo?v=4&text=${yazi}`
  .replace(' ', '+')

  
  const botclubembed = new botclub.MessageEmbed()
  .setTitle("Logonuz Hazır!")
  .setImage(botclublogo)
  .setTimestamp()
  .setFooter(`${btclub.author.username} Kullandı!`)
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
    name: 'arrow',
    description: 'Yazdığınız yazıyı arrow çevirir.',
    usage: 'arrow <yazı>'
}