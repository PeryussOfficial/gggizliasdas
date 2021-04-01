const dc = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, member) => {

  let uye = message.mentions.users.first() || message.author;
  let bilgi = db.get(`peryusstoplamstat${uye.id}`);
  let yazı = "Top Teyit Listesi | Peryuss";

  let top = message.guild.members.cache
    .filter(uye => db.get(`peryusstoplamstat${uye.id}`))
    .array()
    .sort(
      (uye1, uye2) =>
        Number(db.get(`peryusstoplamstat${uye2.id}`)) -
        Number(db.get(`peryusstoplamstat${uye1.id}`))
    )
    .slice(0, 15)
    .map(
      (uye, index) =>
        index +
        1 +
        " • <@" +
        uye +
        "> | `" +
        db.get(`peryusstoplamstat${uye.id}`) +
        "` Kayıta Sahip."
    )
    .join("\n");
  message.channel.send(
    new dc.MessageEmbed()
      .setAuthor(yazı, message.guild.iconURL({ dynamic: true }))
      .setColor("GREEN")
      .setFooter("Peryuss Was Here xd"
      )
      .setDescription(top)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["topteyit", "teyitler", "top-teyit"],
  permLevel: 0
};

exports.help = {
  name: "topteyit"
};
