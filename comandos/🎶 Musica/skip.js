module.exports = {
    name: "skip", // El nombre del comando
    aliases: ["Saltar"], // Los alias del comando
    desc: "Sirve para saltar una cancion", // La descripcion del comando
    run: async (client, message, args, prefix) => {
        const queue = client.distube.getQueue(message);
        if(!queue) return message.reply(`❌ **No hay ninguna cancion reproduciendose!**`);
        if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
        client.distube.skip(message);
        message.reply(`⏭ **Saltando a la siguiente cancion!**`)
    }
}