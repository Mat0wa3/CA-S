const serverSchema = require(`${process.cwd()}/modelos/servidor.js`);
const config = require(`${process.cwd()}/config.json`);

module.exports = {
    asegurar,
    asegurar_todo,
}

async function asegurar(schema, id, id2, objeto){
    let data = await schema.findOne({id: id2})
    if(!data){
        console.log("NO HABIA BASE DE DATOS CREADA, CREANDO UNA...")
        data = await new schema(objeto)
        data.save();
    }
    return data;
}

async function asegurar_todo(guildid){
    let serverdata = await serverSchema.findOne({guildID: guildid})
    if(!serverdata){
        console.log(`Asegurado: Config de Server`.green);
        serverdata = await new serverSchema({
            guildID: guildid,
            prefijo: config.prefix
        });
        await serverdata.save();
    }
}
