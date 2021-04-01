const Discord = require(`discord.js`);
const db = require(`quick.db`);
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

let yetkili = "822530345323986995";

if (!message.member.roles.cache.has(yetkili))
    return message.channel.send(
      `Bu Komutu Kullanabilmek İçin \`❃ Register Office\` Adlı Role Sahip Olman Gerek!`
    );

  let kişi = message.mentions.users.first();
  if (!args[0]) {
    const erkekbilgi = await db.fetch(
      `peryusserkekstat${message.author.id}.${message.guild.id}`
    );
    const kızbilgi = await db.fetch(
      `peryusskadınstat${message.author.id}.${message.guild.id}`
    );
    const peryuss1 = new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(
      message.member.displayName,
      message.author.avatarURL({ dynamic: true })
    )
      .setFooter(`Peryuss Was Here xd`)
      .setDescription(`
    \n\`>\` Toplam \`${erkekbilgi ? erkekbilgi : "0"}\` Erkek Kayıtı Bulunuyor.
    \`>\` Toplam \`${kızbilgi ? kızbilgi : "0"}\` Kız Kayıtı Bulunuyor.`);
    message.channel.send(peryuss1);
  }
  if (kişi) {
    const erkekbilgi = await db.fetch(
      `erkekistatistik${kişi.id}.${message.guild.id}`
    );
    const kızbilgi = await db.fetch(
      `kızistatistik${kişi.id}.${message.guild.id}`
    );
    const peryuss2 = new Discord.MessageEmbed()
      .setAuthor(kişi.username, kişi.avatarURL())
      .setFooter(`Peryuss Was Here xd`)
      .setColor("GREEN")
      .setDescription(`
    \n\`>\` Toplam \`${erkekbilgi ? erkekbilgi : "0"}\` Erkek Kayıtı Bulunuyor.
    \`>\` Toplam \`${kızbilgi ? kızbilgi : "0"}\` Kız Kayıtı Bulunuyor.
`);
    message.channel.send(peryuss2);
  }

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["teyitbilgi", "teyit-bilgi", "kayıt-bilgi", "teyitbilgim", "teyit*bilgim"],
  permLevel: 0
};
exports.help = {
  name: "kayıtbilgi"
};
