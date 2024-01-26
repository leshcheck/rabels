const Discord = require('discord.js');
const talkedRecently = new Set();
exports.run = function(client, message,  args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle(`:warning: Yetersiz Yetki!`).setDescription(`Bu özelliği kullanabilmek için \`Mesajları Yönet\` yetkisine sahip olmalısınız.`));
  
       if (talkedRecently.has(message.author.id)) {
           return message.reply("Bu özelliği 90 saniyede bir kullanabilirsin!");
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
          talkedRecently.delete(message.author.id);
        }, 9000);
    }
if(!args[0]) return message.reply("Lütfen 1-101 Arası Sayı Girin!");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`${message.member}, ${args[0]} Adet Mesaj Başarıyla Uzaya Fırlatıldı! :rocket:`).then(botclub => botclub.delete({timeout: 5000}));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil'
};