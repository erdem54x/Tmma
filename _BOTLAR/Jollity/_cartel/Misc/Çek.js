const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { cartelinEmbedi } = require("../../../../_SYSTEM/Reference/Embed");
module.exports = {
    Isim: "çek",
    Komut: ["çek", "izinliçek","cek","izinlicek"],
    Kullanim: "izinliçek @munur/ID",
    Aciklama: "Belirlenen üyeye izin ile yanına gider.",
    Kategori: "diğer",
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
    let embed = new cartelinEmbedi()
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const ramalcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!message.member.voice.channel) return message.reply(`${cevaplar.prefix} Bir ses kanalında olman lazım.`).then(x => { setTimeout(() => {x.delete() }, 7500)});
    if (!member) return message.reply(`${cevaplar.prefix} Bir üye belirtmelisin.`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    if (message.member.id === member.id) return message.reply(`${cevaplar.prefix} Kendinin çekemezsin!`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    if (message.member.voice.channel === member.voice.channel) return message.reply(`${cevaplar.prefix} Belirttiğin üyeyle aynı kanaldasın!`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    if (!member.voice.channel) return message.reply(`${cevaplar.prefix} Belirtilen üye herhangi bir ses kanalında değil!`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    if (member.user.bot) return message.reply(cevaplar.bot).then(x => { setTimeout(() => {x.delete() }, 7500)});
    if (message.member.roles.highest.position < ramalcim.roles.highest.position) { 
        let Row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("kabulet")
            .setLabel("Kabul Et")
            .setEmoji(message.guild.emojiGöster(emojiler.onay_munur))
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("reddet")
            .setLabel("Reddet")
            .setEmoji(message.guild.emojiGöster(emojiler.no_munur))
            .setStyle("DANGER")
        )   
        message.channel.send({content: `${ramalcim.toString()}`, embeds: [embed.setDescription(`${member}, ${message.author} adlı üye \`${message.member.voice.channel.name}\` odasına seni çekmek istiyor.\nKabul ediyor musun?`)], components: [Row]}).then(async (msg) => {
            var filter = (i) => i.user.id == ramalcim.id
            let collector = msg.createMessageComponentCollector({filter: filter, time: 30000})
            collector.on('collect', async (i) => {
                if(i.customId == "kabulet") {
                    await i.deferUpdate().catch(err => {})
             
                    await msg.edit({content: `${message.member.toString()}`, embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.onay_munur)} ${ramalcim}, isimli üye senin odaya çekme isteğini kabul etti.`)], components: []}).catch(err => {})
                    await ramalcim.voice.setChannel(message.member.voice.channel.id).catch(err => {});
                    message.react(message.guild.emojiGöster(emojiler.onay_munur) ? message.guild.emojiGöster(emojiler.onay_munur).id : undefined).catch(err => {})
                    setTimeout(() => {
                        msg.delete().catch(err => {})
                    }, 12000);
                }
                if(i.customId == "reddet") {
                    await i.deferUpdate().catch(err => {})
                   
                    await msg.edit({content: `${message.member.toString()}`, embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.no_munur)} ${ramalcim}, isimli üye senin odaya çekme isteğini reddetti!`)], components: []}).catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.no_munur) ? message.guild.emojiGöster(emojiler.no_munur).id : undefined).catch(err => {})
                    setTimeout(() => {
                        msg.delete().catch(err => {})
                    }, 12000);
                }
            })
            collector.on('end', async (i) => {
                i.delete()
                let RowTwo = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("kabulet")
                    .setLabel("Zaman Aşımı!")
                    .setStyle("SECONDARY")
                    .setDisabled(true),
                )  
                await msg.edit({content: `${message.member.toString()}`, embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.no_munur)} ${message.author}, ${ramalcim} isimli üye tepki vermediğinden dolayı işlem iptal edildi.`)], components: [RowTwo]}).catch(err => {})
                setTimeout(() => {
                    msg.delete().catch(err => {})
                }, 12000);
            })
        })
    } else {
        if (roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) || message.member.permissions.has('ADMINISTRATOR')) {
            await ramalcim.voice.setChannel(message.member.voice.channel.id).catch(err => {});
            message.react(message.guild.emojiGöster(emojiler.onay_munur) ? message.guild.emojiGöster(emojiler.onay_munur).id : undefined)
            return message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.onay_munur)} ${message.member} isimli yetkili ${member} isimli üyeyi \`${message.member.voice.channel.name}\` isimli odaya çekti!`)]}).then(x => setTimeout(() => {
                x.delete().catch(err => {})
            }, 7500))
        }
    }
    }
};