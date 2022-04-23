const Discord = require("discord.js");
const config = require('./config.json')
require("colors")
const client = new Discord.Client({
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
})

client.commands = new Discord.Collection();
client.slashes = new Discord.Collection();
client.aliases = new Discord.Collection();

function requerirHandlers(){
    ["command", "events", "distube"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch(e) {
            console.warn(e)
        }
    })
}
requerirHandlers();

client.login(config.token)