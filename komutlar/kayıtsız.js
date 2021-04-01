const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  let kayıtsız = "822530384319086602";
  let yetkili = "822530345323986995";

  if (!message.member.roles.cache.has(yetkili))
    return message.channel.send(
      `Bu Komutu Kullanabilmek İçin \`❃ Register Office\` Adlı Role Sahip Olman Gerek!`
    );
  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!member)
    return message.channel.send(`Kimi Kayıtsız Yapacağım?`);
  const peryuss = new Discord.MessageEmbed()
    .setTitle(`Başarılı!`)
    .setDescription(
      `${member} Adlı Kullanıcıya Başarılı Bir Şekilde <@&${kayıtsız}> Rolünü Verdim!`
    );
  message.channel.send(peryuss);
  member.roles.set(['822530384319086602'])
};
exports.conf = {
  aliases: []
};
exports.help = {
  name: "kayıtsız"
};
