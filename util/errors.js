const Discord = require("discord.js");
const fs = require("fs");
let config = require("../config.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setTitle("Yetersiz yetki")
        .setColor(config.red)
        .addField("Yetki gerekli", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("HATA")
        .addField(`${user} yetkileri var`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("HATA")
        .setDescription("Bir botu yasaklayamazsınız.")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("HATA")
        .setDescription("Bu kullanıcı bulunamadı.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("HATA")
        .setDescription("Lütfen bir neden belirtin.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}