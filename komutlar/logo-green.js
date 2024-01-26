const botclub = require('discord.js');

exports.run = async (client, btclub, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return btclub.channel.send(new botclub.MessageEmbed().setDescription(`**Lütfen logo yapılacak mesajı giriniz!**`))
  const botclublogo = `https://dynamic.brandcrowd.com/asset/logo/7f0254b2-49ae-4819-9107-47728665a65f/logo?v=4&text=${yazi}`
  .replace(' ', '+')

  
  const botclubembed = new botclub.MessageEmbed()
  .setTitle("Logonuz Hazır!")
  .setTimestamp()
  .setImage(botclublogo)
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
    name: 'green',
    description: 'Yazdığınız yazıyı green çevirir.',
    usage: 'green <yazı>'
}