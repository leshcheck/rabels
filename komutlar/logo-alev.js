const botclub = require('discord.js');

exports.run = async (client, btclub, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return btclub.channel.send(new botclub.MessageEmbed().setDescription(`**Lütfen logosu yapılacak mesajı giriniz!**`))
  const botclublogo = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=flame-logo&text=${yazi}`
  .replace(' ', '+')

  
  const botclubembed = new botclub.MessageEmbed()
  .setTitle("Logonuz Hazır!")
  .setImage(botclublogo)
  .setFooter(`${btclub.author.username} Kullandı!`)
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
    name: 'alev',
    description: 'Yazdığınız yazıyı alev çevirir.',
    usage: 'alev <yazı>'
}