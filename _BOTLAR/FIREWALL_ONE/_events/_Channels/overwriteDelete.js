const { GuildMember, MessageEmbed, GuildChannel, Permissions } = require("discord.js");
const { cartelinEmbedi } = require("../../../../_SYSTEM/Reference/Embed");


 /**
 * @param {GuildChannel} oldChannel
 * @param {GuildChannel} newChannel
 */


module.exports = async (oldChannel, newChannel) => {
    const Guard = require('../../../../_SYSTEM/Databases/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: oldChannel.guild.id})
    if(Data && !Data.channelGuard) return;
    let embed = new cartelinEmbedi().setTitle("Sunucuda Kanal İzni Silindi!")
    let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_DELETE'}).then(audit => audit.entries.first())
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "channels" ,"Kanal İzni Silindi!")) return;
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    embed.setDescription(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`#${oldChannel.name}\` isimli kanalda izni sildi ve yasaklandı.`);
    let loged = newChannel.guild.kanalBul("guard-log");
    await newChannel.permissionOverwrites.set(oldChannel.permissionOverwrites.cache.array());
    if(loged) await loged.send({embeds: [embed]});
    const owner = await newChannel.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Kanal İzni Silme!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "channelUpdate"
}
