const { MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
module.exports = {
    name: "ping",
    aliases: ["latencia", "ms"],
    desc: "Sirve para ver la latencia del Bot",
    owner: true,
    run: async (client, message, args, prefix) => {
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**Cliente**: \`🟢 EN LINEA\` - \`${client.ws.ping}ms\`\n **Hora**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n**Base de datos**: \`${switchTo(connection.readyState)}\``)

        message.reply({embeds: [Response]})
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 DESCONECTADO`
        break;
        case 1 : status = `🟢 CONECTADO`
        break;
        case 2 : status = `🟠 CONECTANDO`
        break;
        case 3: status = `🟣 DESCONECTANDO`
        break;
    }
    return status;
}