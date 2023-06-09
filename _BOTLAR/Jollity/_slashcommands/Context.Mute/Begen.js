const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')
moment.locale("tr");
const ms = require("ms");
const { cartelinEmbedi } = require("../../../../_SYSTEM/Reference/Embed");
const Users = require('../../../../_SYSTEM/Databases/Schemas/Client.Users');

module.exports = {
    name: "Beğen/Beğenme 👍",
    description: "Testde!",
    type: 'MESSAGE',
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, int, args) => {
        console.log(int.targetId)
        let message = int
        let check = await client.users.fetch(message.targetMessage.author.id)
        let member = message.guild.members.cache.get(check.id)
        let author = message.guild.members.cache.get(int.user.id)
        let author_data = await Users.findOne({_id: author.id})
        let member_data = await Users.findOne({_id: member.id})
        if(member.id == author.id) return int.followUp({content: `${message.guild.emojiGöster(emojiler.no_munur)} Kendinizi beğenemezsiniz.`, ephemeral: true})

        if(member_data.Likes.includes(author.id)) {
            await Users.updateOne({_id: member.id}, {
                $pull: {Likes: author.id}
            }, {upsert: true})
            await int.followUp({content: `${message.guild.emojiGöster(emojiler.onay_munur)} Başarıyla ${member} isimli üyeyin beğenisini kaldırdınız.`, ephemeral: true})
        } else {
            await Users.updateOne({_id: member.id}, {
                $push: {Likes: author.id}
            }, {upsert: true})
            await int.followUp({content: `${message.guild.emojiGöster(emojiler.onay_munur)} Başarıyla ${member} isimli üyeyi beğendiniz.`, ephemeral: true})
        }
       
    }
};