module.exports = {
    name: "stop", // El nombre del comando
    aliases: ["desconectar", "leavevc", "leave", "disconnect"], // Los alias del comando
    desc: "Sirve para desconectar el bot de la sala", // La descripcion del comando
    run: async (client, message, args, prefix) => {
        const queue = client.distube.getQueue(message);
        if(!queue) return message.reply(`❌ **No hay ninguna cancion reproduciendose!**`);
        if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
        client.distube.stop(message);
        message.reply(`🏃🏼‍♂**Desconcetado!**`)
    }
}