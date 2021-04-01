const dc = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, member) => {

let peryussyetkili = ayarlar.yetkili;
  

if (!message.member.roles.cache.has(peryussyetkili)) {
    return message.channel.send(
      new dc.MessageEmbed()
        .setColor("RED")

// Peryuss Was Here xd

.setAuthor(
      message.member.displayName,
      message.author.avatarURL({ dynamic: true })
    )
.setFooter(`Peryuss Was Here xd`)
        .setDescription(`<@` + message.author.id + `> Yetkin Yetersiz.`)
    );

  let uye = message.mentions.users.first() || message.author;
  let bilgi = db.get(`peryusstoplamstat.${uye.id}.toplam`);
  let yazı = "Top Teyit Listesi";

  let top = message.guild.members.cache
    .filter(uye => db.get(`peryusstoplamstat.${uye.id}.toplam`))
    .array()
    .sort(
      (uye1, uye2) =>
        Number(db.get(`peryusstoplamstat.${uye2.id}.toplam`)) -
        Number(db.get(`peryusstoplamstat.${uye1.id}.toplam`))
    )
    .slice(0, 15)
    .map(
      (uye, index) =>
        index +
        1 +
        " • <@" +
        uye +
        "> | `" +
        db.get(`peryusstoplamstat.${uye.id}.toplam`) +
        "` Kayıta Sahip."
    )
    .join("\n");
  message.channel.send(
    new dc.MessageEmbed()
      .setAuthor(yazı, message.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setColor("GREEN")
      .setFooter("Peryuss Was Here xd"
      )
      .setDescription(top)
  );
};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "asdasdas"
};
