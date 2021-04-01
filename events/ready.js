const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

var prefix = ayarlar.prefix

module.exports = client => {
  console.log(`Komutlar Yüklendi.`);
  console.log(`${client.user.username} ercn ab bot hazır ab`);
  client.user.setActivity("Peryuss 💖 Atina", { type : "WATCHING"});
  console.log(`Bot Aktif !`);
};  
