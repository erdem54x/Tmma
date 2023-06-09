const { Client, Message, MessageEmbed} = require("discord.js");
const { cartelinEmbedi } = require("../../../../_SYSTEM/Reference/Embed");
module.exports = {
    Isim: "toplantıçağır",
    Komut: ["toplantı-çağır", "meeting-call"],
    Kullanim: "toplantıçağır",
    Aciklama: "Seste olmayan yetkilileri çağırır.",
    Kategori: "kurucu",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    if(!sistem._rooter.rooters.includes(message.member.id) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let embed = new cartelinEmbedi()
    let enAltYetkiliRolü = message.guild.roles.cache.get(roller.başlangıçYetki);
    let yetkililer = message.guild.members.cache.filter(ramalcim => !ramalcim.user.bot  && ramalcim.roles.highest.position >= enAltYetkiliRolü.position && !ramalcim.voice.channel)
    if (yetkililer.length == 0) return message.reply('Aktif olup, seste olmayan yetkili bulunmuyor. Maşallah!');
    let mesaj = await message.channel.send(`**${yetkililer.size}** yetkiliye sese gelme çağırısı yapılıyor`);
    var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
        yetkililer.forEach((yetkili) => {
          setTimeout(() => {  
            yetkili.send(message.guild.name+' Sunucusunda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetkilerin alınacaktır.').then(x => mesaj.edit({embeds: [embed.setDescription(`${yetkili} yetkilisine özelden mesaj atıldı!`)]})).catch(err => message.channel.send(`${yetkili}, Sunucusunda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetkilerin alınacaktır.`).then(x => mesaj.edit({embeds: [embed.setDescription(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`)]})));
          }, 2*1000);
        });
    }
};