const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./config.json');
const emoji = require('./Referans/emojiler.json')
const { system, sistem } = require('./Referans/system.js')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');

require('./util/eventLoader')(client);
 
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
/*client.on('debug', e => {
console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
 });*/

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



client.on('message', async message => {
const prefixÖ = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

  const embed = new Discord.MessageEmbed()
.setThumbnail(client.user.avatarURL())
.setDescription(`
<@${message.author.id}>, bu sunucuda ayarlanmış olan prefix **${prefixÖ}**

Yardım menüsü için **${prefixÖ}yardım** yazman gerekli olacaktır :)`)
.setColor('RANDOM')
  if(message.content == `<@!${client.user.id}>`) return message.channel.send(embed);
});

client.on('voiceStateUpdate', (oldState, newState) => {

const Database = require('./VERILER/Database')
const vdb = new Database("Database", "Voice")  
const Activites = new Map();

  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
  if(!oldState.channelID && newState.channelID) { 
    Activites.set(oldState.id, Date.now());
  }
      let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); 
    } else data = Activites.get(oldState.id);
  
    let duration = Date.now() - data;
    if(oldState.channelID && !newState.channelID) { 
        Activites.delete(oldState.id);
        vdb.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);
        vdb.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    } else if(oldState.channelID && newState.channelID){
        Activites.set(oldState.id, Date.now());
        vdb.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);
        vdb.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    }
  
  /*
      if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
      if(!oldState.channelID && newState.channelID) { 
    Activites.set(oldState.id, Date.now());
  }
  
  let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); 
    } else data = Activites.get(oldState.id);
    let duration = Date.now() - data;
    if(oldState.channelID && !newState.channelID) {
    Activites.delete(oldState.id)
        vdb.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);
        vdb.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    } else if (oldState.channelID && newState.channelID){
      Activites.set(oldState.id, Date.now());
        vdb.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);
        vdb.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    }
*/
})

client.on("ready", async function() {
const voiceChannel = "844989258690723864"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})

client.on('message', message  => {

const Database = require("./VERILER/Database")
const mesaj = new Database("Database", "Message")
let user = message.author;
let coin = db.fetch(`coin.${message.guild.id}.${user.id}`)
let prefixX = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
if(message.author.bot || message.content.startsWith(prefixX)) return;
  
mesaj.add(`stats.${message.guild.id}.${user.id}.channels.${message.channel.id}`, 1)
mesaj.set(`stats.${message.guild.id}.${message.author.id}.activity`, Date.now())

db.add(`görevmesajgönder.${message.guild.id}.${user.id}`, 1)
if(!message.length > 10 ? db.add(`coin.${message.guild.id}.${user.id}`, +30) : message);
}); 


/////////////////////////////////////////////////  KOMUTLAR   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

                              ////////////////////  DAVET SISTEMI \\\\\\\\\\\\\\\\\\\\

const invites = {};

client.on("guildMemberAdd", async (member, user, message) => {
  
member.guild.fetchInvites().then(async guildInvites => {
  
let davetKanalı = db.fetch(`davetKanali_${user}`)
if(!davetKanalı) return;
  
const ei = invites[member.guild.id];
invites[member.guild.id] = guildInvites;
  
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);
  
  db.add(`görevdavetet.${message.guild.id}.${user.id}`, 1)
  db.add(`davet_${invite.inviter.id}_${member.guild.id}`, 1)
  db.set(`buDavet`, invite.inviter.id)
  let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
  
  let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }
    davetKanalı.send(`<@${davetçi.id}>`).then(m => m.delete({ timeout: 1000 }))
    client.channels.get(davetKanalı).send(new Discord.MessageEmbed().setDescription(`<@${member.user.id}> Sunucuya Katıldı.! Davet Eden Kişi: <@${davetçi.id}> [**${sayı2}**]`));
  
  if(!invites.length > 5 ? db.add(`coin.${message.guild.id}.${user.id}`, +120) : invites);
   /* if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }*/})});

client.on("guildMemberRemove",  async (member, user, message) => {
let davetKanalı = db.fetch(`davetKanali_${user}`)
if(!davetKanalı) return;

  let d = await db.fetch(`buDavet_${member.id}`);
  const sa = client.users.get(d);
    if (!d) {
    client.channels.get(davetKanalı).send(`<@${member.user.id}> Sunucudan Ayrıldı.! Davet Eden Kişi: [ **BULUNAMADI**]`);
    return;
} else {
client.channels.get(davetKanalı).send(`<@${member.user.id}> Sunucudan Ayrıldı.! Davet Eden Kişi: [ <@${sa.id}> ]`)}
db.delete(`görevdavetet.${message.guild.id}.${user.id}`, 1)
db.delete(`davet_${d}_${member.guild.id}`, 1)
})

////////////////////  OTOROL \\\\\\\\\\\\\\\\\\\\
client.on("guildMemberAdd", async member => {
  
 let kanal = db.fetch(`otorolkanal_${member.guild.id}`)   
 let rol = db.fetch(`otorolrol_${member.guild.id}`)
  
if(!kanal) return
member.roles.add(rol)
  client.channels.cache.get(kanal).send(':inbox_tray: Otomatik Rol Verildi Seninle Beraber **`'+member.guild.memberCount+'`** Kişiyiz! :mega: Hoşgeldin! **`'+member.user.username+'`**')
});
                              ////////////////////  OTOTAG \\\\\\\\\\\\\\\\\\\\
client.on("guildMemberAdd", async member => {
let tagoto = await db.fetch(`ototag?Ototag_${member.guild.id}`) 
let ototag_kanal = await db.fetch(`ototag?OtotagKanal_${member.guild.id}`)
if(!tagoto || !ototag_kanal) return
 
 member.setNickname(`${tagoto} | ${member.user.username}`)
client.channels.cache.get(ototag_kanal).send(':inbox_tray: Otomatik Tag Verildi Seninle Beraber **`'+member.guild.memberCount+'`** Kişiyiz! :mega: Hoşgeldin! **`'+member.user.username+'`**')
})

                              ////////////////////  SAYAÇ \\\\\\\\\\\\\\\\\\\\
client.on("guildMemberAdd", async (message, member, guild) => {
  let sayac = db.get(`sayac.${member.guild.id}`);
  if (!sayac) return;
  let kanal = client.channels.get(sayac.channel);
  if (!kanal) return db.delete(`sayac.${member.guild.id}`);
  kanal.send(`${member.user.tag} sunucuya katıldı! Sunucu şu an **${member.guild.memberCount}** kişi. **${sayac.sayi}** kişi olmamıza **${sayac.sayi - member.guild.memberCount}** kişi kaldı!`);
  
  if (member.guild.memberCount >= sayac.sayi) {
    kanal.send(new Discord.MessageEmbed().setDescription(":tada: Sunucu, sayaç hedefine ulaştı!"));
    message.guild.owner.send(new Discord.MessageEmbed().setDescription(":tada: **"+ sayac.sayi +"** Hedefine ayarlamış olduğunuz hedefe ulaştık.\n\n:exclamation: Sayaç sıfırlanmıştır tekrar ayarlayabilirsiniz!"))
    db.delete(`sayac.${member.guild.id}`);
  };
});

client.on("guildMemberRemove", async member => {
  let sayac = db.get(`sayac.${member.guild.id}`);
  if (!sayac) return;
  let kanal = client.channels.get(sayac.channel);
  if (!kanal) return db.delete(`sayac.${member.guild.id}`);
  kanal.send(`${member.user.tag} sunucudan ayrıldı! Sunucu şu an **${member.guild.memberCount}** kişi. **${sayac.sayi}** kişi olmamıza **${sayac.sayi - member.guild.memberCount}** kişi kaldı!`);
});
                              ////////////////////  YASAKLI TAG \\\\\\\\\\\\\\\\\\\\
client.on("guildMemberAdd", async (member, message) => {

    let guild = member.guild;

    let tag = db.fetch(`yasaklıtag.${member.guild.id}`);
    if (!tag) return;
    let tagrol = db.fetch(`tagrol.${member.guild.id}`)
    if (!tagrol) return;
    let taglog = db.fetch(`tagkanal.${member.guild.id}`)
    let kanal = member.guild.channels.cache.get(taglog)
    let rol = member.guild.roles.cache.get(tagrol).name
    setTimeout(() => {
        if (!tag.some(yasak => member.user.username.includes(yasak))) return;
        let tag;
        tag.forEach(a => {
            if (member.user.username.includes(a)) tag = a
        })
        member.roles.set([`${tagrol}`])
        member.send(new Discord.MessageEmbed()
            .setTitle(`Yasaklı Tag Tespit Edildi!`)
            .setDescription(` \`${guild.name}\` Sunucusunda Yasaklı TAG'da bulunuyorsunuz\n Sunucu içi yetkililere ulaşarak yasaklıtag'dan çıkabilirsin çıkabilirsin.`));
    });

    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Yasaklı Tag Tespit Edildi!`)
        .setDescription(` ${message.author.username} Yasaklı tag'da bulunduğu için gerekli bilgileri buraya yolladım. `)
    );
});