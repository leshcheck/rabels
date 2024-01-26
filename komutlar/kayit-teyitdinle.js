const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => { 
    
        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send(new Discord.MessageEmbed().setColor('#00fff8').setDescription(`${message.author} öncelikle sesli bir kanala girmen gerekiyor.`))
            
        if (!fs.existsSync(`./botclub-${message.author.id}.pcm`)) return message.channel.send(new Discord.MessageEmbed().setColor('#00fff8').setDescription(`${message.author} sana ait herhangi bir ses bulunamamakta.`))
        const connection = await message.member.voice.channel.join();
        message.channel.send(new Discord.MessageEmbed().setColor('#00fff8').setDescription(`${message.author} ses kaydı dinletiliyor.`))
        const stream = fs.createReadStream(`./botclub-${message.author.id}.pcm`);

        const dispatcherr = connection.play(stream, {
         type: "converted" 
        });
         
        dispatcherr.on("finish", () => {
            message.member.voice.channel.leave();
            return message.channel.send(new Discord.MessageEmbed().setColor('#00fff8').setDescription(`${message.author} ses kaydı dinletildi.`))
      })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["teyit-dinle", "teyit-başlat"],
    permLevel: 0,
    kategori: "kayıt"
};

exports.help = {
    name: "kayıt-teyit-dinle",
    description: "Aldığınız ses kaydını dinlersiniz."
};