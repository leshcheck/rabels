const ayarlar = require('../config.json');
const db = require('quick.db')
const dc = require('discord.js')
let talkedRecently = new Set();
module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      message.channel.send(new dc.MessageEmbed().setDescription(`:warning: \`${command}\` adında bir komut yok! Komut listesine bakmak için: \`\`${ayarlar.prefix}yardım\`\``))
    }
  }
     if (db.has(`karalist_${message.author.id}`) === true) {
    let embed = new dc.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("Komutlarımı kullanamazsın çünkü karalistedesin!")
    message.channel.send({embed: embed})
    return
  };
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
     let bakım = db.fetch('bakım');
  if(message.author.id !== ayarlar.sahip){

    if(bakım){

  return message.channel.send(new dc.MessageEmbed().setDescription(`
  <@${message.author.id}>
  **:gear: Sizlere En İyi Hizmeti Verebilmek İçin Bakımdayız.**
  ❓**Bakım Sebebi:** \`${bakım}\`

  :arrows_counterclockwise: **Lütfen Daha Sonra Tekrar Deneyin.**
  `).setColor("RANDOM"))
                              }}
    
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};