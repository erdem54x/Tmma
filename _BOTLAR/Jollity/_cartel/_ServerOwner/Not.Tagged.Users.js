const { Client, Message, MessageEmbed} = require("discord.js");
const { cartelinEmbedi } = require("../../../../_SYSTEM/Reference/Embed");

module.exports = {
    Isim: "tagsızver",
    Komut: ["tagsızlarver"],
    Kullanim: "tagsızver",
    Aciklama: "",
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
    if(!ayarlar.type) return;
    let embed = new cartelinEmbedi()
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));

    let rolsuzramalcim = message.guild.members.cache.filter(m => m.user.username.includes(ayarlar.tag) && !m.roles.cache.has(roller.tagRolü) && !m.roles.cache.has(roller.şüpheliRolü) && !m.roles.cache.has(roller.yasaklıTagRolü) &&  !m.roles.cache.has(roller.jailRolü) && !roller.kayıtsızRolleri.some(x => m.roles.cache.has(x)))
    rolsuzramalcim.forEach(roluolmayanlar => { 
      roluolmayanlar.roles.add(roller.tagRolü).catch(err => {})
      roluolmayanlar.setNickname(roluolmayanlar.displayName.replace(ayarlar.tagsiz, ayarlar.tag)).catch(err => {})
    });
    let rollütagsiz = message.guild.members.cache.filter(m => !m.user.username.includes(ayarlar.tag) && m.roles.cache.has(roller.tagRolü) && !m.roles.cache.has(roller.şüpheliRolü) && !m.roles.cache.has(roller.yasaklıTagRolü) &&  !m.roles.cache.has(roller.jailRolü) && !roller.kayıtsızRolleri.some(x => m.roles.cache.has(x)))
        rollütagsiz.forEach(rl => {
        rl.setNickname(rl.displayName.replace(ayarlar.tag, ayarlar.tagsiz)).catch(err => {})
        rl.roles.remove(roller.tagRolü).catch(err => {})
    });
    message.channel.send({embeds: [embed.setDescription(`Sunucuda taglı olup rolü olmayan \`${rolsuzramalcim.size}\` üyeye taglı rolü verildi, ve tagsız \`${rollütagsiz.size}\` üyeden geri alınmaya başlandı!`).setFooter('bu işlem biraz zaman alabilir.')]}).then(x => setTimeout(() => {
        x.delete()
    }, 7500));
    message.react(message.guild.emojiGöster(emojiler.onay_munur) ? message.guild.emojiGöster(emojiler.onay_munur).id : undefined)
    }
};