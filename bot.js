const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("croxydb");
const format = require("moment-duration-format")
const moment = require("moment")
const chalk = require("chalk");
const ayarlar = require("./ayarlar.json")
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
      reject(e);
    }
  });
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;

  return permlvl;
};


client.on("guildMemberAdd", async member => {
  member.setNickname(`❃ İsim | Yaş`)
});


// HG ETİKET 

let peryussyetkili = ayarlar.yetkili
let peryusskanal = ayarlar.kayıtkanal

 client.on("guildMemberAdd", async member => {
  client.channels.cache.get(peryusskanal).send(`<@&${peryussyetkili}> ${member}`);
});

// OTOROL //

let peryusskayıtsız = ayarlar.kayıtsız

client.on("guildMemberAdd", async member => {
  member.roles.add(peryusskayıtsız)
});

// HG MESAJ

  client.on("guildMemberAdd", member => {
  let peryusshgkanal = ayarlar.kayıtkanal
  if (!peryusshgkanal) return;

  let aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };

  let bitiş = member.user.createdAt;
  let günü = moment(new Date(bitiş).toISOString()).format("DD");
  let ayı = moment(new Date(bitiş).toISOString())
    .format("MM")
    .replace("01", "Ocak")
    .replace("02", "Şubat")
    .replace("03", "Mart")
    .replace("04", "Nisan")
    .replace("05", "Mayıs")
    .replace("06", "Haziran")
    .replace("07", "Temmuz")
    .replace("08", "Ağustos")
    .replace("09", "Eylül")
    .replace("10", "Ekim")
    .replace("11", "Kasım")
    .replace("12", "Aralık")
    .replace("13", "Peryuss"); 
  let yılı = moment(new Date(bitiş).toISOString()).format("YYYY");
  let saati = moment(new Date(bitiş).toISOString()).format("HH:mm");

  let günay = `${günü} ${ayı} ${yılı} ${saati}`;

  let süre = member.user.createdAt;
  let gün = moment(new Date(süre).toISOString()).format("DD");
  let hafta = moment(new Date(süre).toISOString()).format("WW");
  let ay = moment(new Date(süre).toISOString()).format("MM");
  let ayy = moment(new Date(süre).toISOString()).format("MM");
  let yıl = moment(new Date(süre).toISOString()).format("YYYY");
  let yıl2 = moment(new Date().toISOString()).format("YYYY");

  let netyıl = yıl2 - yıl;

  let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`;

  let peryusshgembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter(`Peryuss Was Here`)
    .setTitle(`❃ Λ T I N A Sunucumuza Hoşgeldin ${member.user.username}!`)
    .setDescription(
        "\nHesap Oluşturulma Tarihi \n`" +
        günay +
        "` \n\n Sunucumuza Hoşgeldin \`" + member.user.username + "\` - \`" + member.id + "\`, \n\nSeninle Birlikte \`" + member.guild.memberCount + "\` Kişiyiz! \n\nSeninle İlgilenmeleri İçin <@&822530345323986995> Yetkililerini Çağırıyorum. \n\nAyrıca Tagımız Olan ❃ Simgesini Alarak Bize Destek Olabilirsin. \n\nSes Teyit Kanallarına Geçerek Kayıt Olabilirsin."
    )
;
  client.channels.cache.get(peryusshgkanal).send(peryusshgembed);
});

// HG MESAJ SON

client.on("ready", () => {
  client.channels.cache.get("822530421384413274").join();
});

// TAG ATMA

client.on('message', msg => {
  if (msg.content === 'tag') {
    msg.channel.send('**❃**');
  }
});

client.on('message', msg => {
  if (msg.content === '.tag') {
    msg.channel.send('**❃**');
  }
});

client.on('message', msg => {
  if (msg.content === 'Tag') {
    msg.channel.send('**❃**');
  }
});

client.on('message', msg => {
  if (msg.content === '.Tag') {
    msg.channel.send('**❃**');
  }
});

client.on('message', msg => {
  if (msg.content === '!tag') {
    msg.channel.send('**❃**');
  }
});

client.on('message', msg => {
  if (msg.content === '!Tag') {
    msg.channel.send('**❃**');
  }
});

  client.login(process.env.TOKEN);

