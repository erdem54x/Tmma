const { munur } = require('../../_SYSTEM/Clients/Global.Clients');
const { Mongoose } = require('../../_SYSTEM/Databases/Global.MongoDB.Driver');
const client = global.client = new munur();
const { GUILD } = require('../../_SYSTEM/Reference/Settings');
const { Collection } = require('discord.js');

// Client Ayarları (Başlangıç)
client.botİsmi = "Intanfry"
client.invites = new Collection();
// Client Ayarları (SON)

Mongoose.Connect()
GUILD.fetch(sistem.SUNUCU.GUILD)
client.fetchCommands(false)
client.fetchEvents()
client.connect(sistem.TOKENLER.Intanfry)

