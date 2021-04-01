const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  let yetkili = "822530345323986995";

  if (!message.member.roles.cache.has(yetkili))
    return message.channel.send(
      `Bu Komutu Kullanabilmek İçin \`❃ Register Office\` Adlı Role Sahip Olman Gerek!`
    );
  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!member)
    return message.channel.send(`Kimi İsmini Değiştireceğim?`);

 let isim = args.slice(1).join(' ');

 if(!isim) return message.channel.send(`Bir İsim Belirtmedin. \nDoğru Kullanım; \`.isim @${client.user.username}#${client.user.discriminator} <yeni isim>\``)
  if(isim.length > 32) return message.channel.send(`Bir İsmi En Fazla \`32\` Karakter Yapabilirim.!`)

  const peryuss = new Discord.MessageEmbed()
.setColor("GREEN")
  .setAuthor(
      message.member.displayName,
      message.author.avatarURL({ dynamic: true })
    )
.setFooter("Peryuss Was Here xd")
    .setDescription(
      `${member} Adlı Kullanıcının İsmini Başarılı Bir Şekilde \`${isim}\` Yaptım!`
    );
  message.channel.send(peryuss);
    message.guild.members.cache.get(member.id).setNickname(`${isim}`)
};
exports.conf = {
  aliases: ["nick"]
};
exports.help = {
  name: "isim"
};
