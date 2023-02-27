const { Client, Message, MessageEmbed } = require("discord.js");
const { cartelinEmbedi } = require("../../../../_SYSTEM/Reference/Embed");
const Kullanici = require('../../../../_SYSTEM/Databases/Schemas/Client.Users')
module.exports = {
    Isim: "tagsızat",
    Komut: ["tagsızkayıtsız"],
    Kullanim: "tagsızat",
    Aciklama: "Sunucudaki üyeler içerisinde tagı olmayanları kayıtsıza at.",
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
    const embed = new cartelinEmbedi() 
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!ayarlar.taglıalım) return message.channel.send(`${cevaplar.prefix} \`Taglı-Alım\` modu kapalı olduğundan dolayı işlem iptal edildi.`);
    let tagsızlar = message.guild.members.cache.filter(x => !x.user.username.includes(ayarlar.tag) && !x.roles.cache.has(roller.vipRolü)  && !x.roles.cache.has(roller.boosterRolü) 
    && (roller.kadınRolleri.some(r => x.roles.cache.has(r) || roller.erkekRolleri.some(r => x.roles.cache.has(r)))))
    tagsızlar.forEach(async (ramalcim) => {
            ramalcim.setNickname(`${ramalcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`).catch(err => {})
            ramalcim.roles.set(roller.kayıtsızRolleri).catch(err => {})
            if(ramalcim.voice.channel) ramalcim.voice.disconnect()
            let data = await Kullanici.findOne({_id: ramalcim.id});
            if(data && data.Name) await Kullanici.updateOne({_id: ramalcim.id}, {$set: { "Gender": "Kayıtsız" }, $push: { "Names": { Staff: message.member.id, Date: Date.now(), Name: data.Name, State: "Tagsız Kayıtsıza Atıldı" } } }, { upsert: true })
            ramalcim.Delete()
            ramalcim.removeStaff()
    })
    message.channel.send({embeds: [embed.setDescription(`Sunucuda kayıtlı olup tagı olmayan \`${tagsızlar.size}\` üye başarıyla kayıtsız'a atıldı!`)]}).then(x => {
        setTimeout(() => {
            x.delete()
        }, 7500);
    })
    message.react(message.guild.emojiGöster(emojiler.onay_munur) ? message.guild.emojiGöster(emojiler.onay_munur).id : undefined)

 }
};