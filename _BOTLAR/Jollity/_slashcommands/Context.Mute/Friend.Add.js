﻿const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')
moment.locale("tr");
const ms = require("ms");
const { cartelinEmbedi } = require("../../../../_SYSTEM/Reference/Embed");
const Users = require('../../../../_SYSTEM/Databases/Schemas/Client.Users');

module.exports = {
    name: "Takip Et/Etme ✅",
    description: "Testde!",
    type: 'MESSAGE',
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, int, args) => {
        let message = int
        let check = await client.users.fetch(message.targetMessage.author.id)
        let member = message.guild.members.cache.get(check.id)
        let author = message.guild.members.cache.get(int.user.id)
        let author_data = await Users.findOne({_id: author.id})
        let member_data = await Users.findOne({_id: member.id})
        if(member.id == author.id) return int.followUp({content: `${message.guild.emojiGöster(emojiler.no_munur)} Kendinizi takip etmeye çalıştınız.`, ephemeral: true})

        if(author_data && member_data && author_data.FollowUp.includes(member.id) && member_data.Follower.includes(author.id)) {
            await Users.updateOne({_id: member.id}, {
                $pull: {Follower: author.id}
            }, {upsert: true})
            await Users.updateOne({_id: author.id}, {
                $pull: {FollowUp: member.id}
            }, {upsert: true})
            if(member_data.FollowUp.includes(author.id)) {
                await int.followUp({content: `${message.guild.emojiGöster(emojiler.onay_munur)} Başarıyla ${member} isimli üyeyi takpipten çıktınız ve arkadaş listesinden kaldırıldı.`, ephemeral: true})
                member.send(`${int.guild.emojiGöster(emojiler.no_munur)} **${author.user.tag}** isimli arkadaşınız sizi takipten **<t:${String(Date.now()).slice(0,10)}:R>** çıktı ve arkadaş listenizden kaldırıldı.`)
                .catch(err => {      
                })
                await Users.updateOne({_id: author.id}, {
                    $pull: {Friends: member.id}
                }, {upsert: true})
                await Users.updateOne({_id: member.id}, {
                    $pull: {Friends: author.id}
                }, {upsert: true})
            } else {
                await int.followUp({content: `${message.guild.emojiGöster(emojiler.onay_munur)} Başarıyla ${member} isimli üyeyi takipten çıktınız.`, ephemeral: true})
                member.send(`${int.guild.emojiGöster(emojiler.no_munur)} **${author.user.tag}** sizi takipten **<t:${String(Date.now()).slice(0,10)}:R>** çıktı.`)
                .catch(err => {      
                })
            }
        } else {
            await Users.updateOne({_id: member.id}, {
                $push: {Follower: author.id}
            }, {upsert: true})
            await Users.updateOne({_id: author.id}, {
                $push: {FollowUp: member.id}
            }, {upsert: true})
            if(member_data && member_data.FollowUp.includes(author.id)) {
                await Users.updateOne({_id: author.id}, {
                    $push: {Friends: member.id}
                }, {upsert: true})
                await Users.updateOne({_id: member.id}, {
                    $push: {Friends: author.id}
                }, {upsert: true})
                await int.followUp({content: `${message.guild.emojiGöster(emojiler.onay_munur)} Başarıyla ${member} isimli üye ile birbirinizi takip ederek arkadaş oldunuz.`, ephemeral: true})
                member.send(`${int.guild.emojiGöster(emojiler.no_munur)} **${author.user.tag}** ile birbirinizi **<t:${String(Date.now()).slice(0,10)}:R>** karşılıklı takip ederek arkadaş oldunuz.`)
                .catch(err => {
                    
                })
            } else {
                await int.followUp({content: `${message.guild.emojiGöster(emojiler.onay_munur)} Başarıyla ${member} isimli üyeyi takip etmeye başladınız.`, ephemeral: true})
                member.send(`${int.guild.emojiGöster(emojiler.onay_munur)} **${author.user.tag}** sizi **<t:${String(Date.now()).slice(0,10)}:R>** takip etmeye başladı.`)
                .catch(err => {
                    
                })
            }
        }
        
       
    }
};