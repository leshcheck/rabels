const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Yetersiz Yetki!`)
        .setDescription(
          `Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın!`
        )
    );
    if (args[0] === 'ekle') {
        let botclubembed = new Discord.MessageEmbed()
       .setDescription(`Yasaklı tag eklemek için ilk önce bir tag belirtmen gerek!`)
        if (!args[1]) return message.channel.send(botclubembed)
        let botclubembed1 = new Discord.MessageEmbed()
            .setDescription(`Tagın En Fazla 1 Karakter'den Oluşabilir Daha Fazlasına İzin Veremem!`)

        if (args[1].length > 1) return message.channel.send(botclubembed1)
        if (db.has(`yasaklıtag.${message.guild.id}`) && db.get(`yasaklıtag.${message.guild.id}`).includes(args[1])) return message.channel.send(new Discord.MessageEmbed().setColor().setAuthor(`${client.user.username} `, client.user.avatarURL({
            dynamic: true
        })).setDescription(`Bu yasaklı tag zaten eklenmiş.`));
        db.push(`yasaklıtag.${message.guild.id}`, args[1])
        let tag1 = db.fetch(`yasaklıtag.${message.guild.id}`).join("  ,  ")
        let botclubembed2 = new Discord.MessageEmbed()
            .setColor()
            .setDescription(`Yasaklı Taglar arasında ${args[1]} başarıyla eklendi.`)
        return message.channel.send(botclubembed2)

    }
    if (args[0] === 'sıfırla') {
        let botclubembed3 = new Discord.MessageEmbed()
            .setDescription(`Zaten Bir Yasaklı Tag eklemişsin!`)
        let tag = db.fetch(`yasaklıtag.${message.guild.id}`)
        if (!tag) return message.channel.send(botclubembed3)
        db.delete(`yasaklıtag.${message.guild.id}`)
    }
    if (args[0] === 'liste') {
        var taglar = ""
        let veriler = db.fetch(`yasaklıtag.${message.guild.id}`)
        if (!veriler) return message.channel.send("Herhangi bir tag ayarlanmadı!")

        for (var i = 0; i < veriler.length; i++) {
            taglar += `**${i+1}-)** \`${veriler[i]}\`\n`
        }
        let embed1 = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Yasaklı Taglar Kısaca Bunlar.")
            .setDescription(`${taglar}`)
        message.channel.send(embed1)
        if (args[0] === 'logkanalı') {
            if (args[1] == "sıfırla") {
                let taglog = db.fetch(`tagkanal.${message.guild.id}`)
                if (!taglog) return message.channel.send("Log Kanalı Zaten Ayarlı Değil!")
                db.delete(`tagkanal.${message.guild.id}`)
               message.channel.send(`Tag Log Kanalı başarı ile sıfırladım.`)
            }
            let kanal = message.mentions.channels.first()
            if (!kanal) return message.channel.send("Tag Logu Ayarlamak için lütfen bir kanal etiketleyin.")
            db.set(`tagkanal.${message.guild.id}`, kanal.id)
            message.channel.send(`Tag log kanalı başarı ile ${kanal} olarak ayarlandı`)
        }
        if (args[0] === 'verilecekrol') {
            if (args[1] == "sıfırla") {
                let rol = db.fetch(`tagrol.${message.guild.id}`)
                if (!rol) return message.channel.send("Tag verilecek rolü zaten ayarlı değil.")
                db.delete(`tagrol.${message.guild.id}`)
                return message.channel.send(`Sıfırlandı!`)
            }
            let kanal = message.mentions.roles.first()
            if (!kanal) return message.channel.send("Lütfen Bir Rol Etiketleyin.")
            db.set(`tagrol.${message.guild.id}`, kanal.id)
            message.channel.send(`Tag alındığında verilecek rol ${kanal} olarak ayarlandı`)
        } else {
            let botclubembed4 = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`Bir seçenek belirt lütfen! Seçeneklerin : \`ekle/sıfırla/liste/verilecek-rol/logkanal\` `)
            message.channel.send(botclubembed4)
        }


    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasaklı-tag'],
  permLevel: 0,
  kategori: "yetkili"
};

exports.help = {
  name: 'yasaklıtag',
  description: 'Yasaklı tag ayarlar.',
  usage: 'sil'
};