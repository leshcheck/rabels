const Discord = require("discord.js");
const Minesweeper = require("discord.js-minesweeper");

module.exports.run = async (client, message, args) => {
  const rows = parseInt(args[0]);
  const columns = parseInt(args[1]);
  const mines = parseInt(args[2]);

  if (!rows) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Bir satır sayısı belirt!")
    );
  }

  if (!columns) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Bir sütun sayısı belirt!")
    );
  }

  if (!mines) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Olamaz Bir Hata!`)
        .setDescription("Bir mayın sayısı belirt!")
    );
  }

  const minesweeper = new Minesweeper({ rows, columns, mines });
  const matrix = minesweeper.start();
  return matrix
    ? message.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Mayın Oyunu")
            .setTimestamp()
            .setFooter(`${message.author.username} Kullandı!`)
            .setImage(
              "https://lh3.googleusercontent.com/proxy/FVA6XQrbDprT6Lyj_aBiTYNzTQQ5edw2LG2vlAWiCldUSp9EhAoUkZjIALbWpIO0rvuSBKQ-lj8wEakKgsKGOASLqCoCcj17GLPEB3a4oaWYjFz9x_r10l-2sYVY28SiV54zc2PESXqs5fU4ITw"
            )
            .setThumbnail(
              "https://lh3.googleusercontent.com/proxy/FVA6XQrbDprT6Lyj_aBiTYNzTQQ5edw2LG2vlAWiCldUSp9EhAoUkZjIALbWpIO0rvuSBKQ-lj8wEakKgsKGOASLqCoCcj17GLPEB3a4oaWYjFz9x_r10l-2sYVY28SiV54zc2PESXqs5fU4ITw"
            )
            .setDescription(matrix)
        )
        .catch(error =>
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle(`Olamaz Bir Hata!`)
              .setDescription("Maksimum `2000` Harf Yazabilirsin!")
          )
        )
    : message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(`Olamaz Bir Hata!`)
          .setDescription("Sayılarında bir terslik var!")
      );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mayın"],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: "mayın",
  description: "mayın",
  usage: "mayın"
};
