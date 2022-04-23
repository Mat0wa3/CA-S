const {DisTube} = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
module.exports = (client, Discord) => {
    console.log(`Modulo de MUSICA Cargado.`.red);

    client.distube = new DisTube(client, {
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestAudio",
            format: "audioonly",
            liveBuffer: 60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        youtubeDL: false,
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin()
        ]
    });

    //Escuchamos los eventos de DisTube

    client.distube.on("playSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle(`**Reproduciendo**`)
                .setDescription(`${song.name} - \`${song.formattedDuration}\``)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setColor("RANDOM")
                .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})
            ]
        })
    })

    client.distube.on("addSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle(`**☑ Añadido**`)
                .setDescription(`${song.name} - \`${song.formattedDuration}\``)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setColor("RANDOM")
                .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})
            ]
        })
    })

    client.distube.on("initQueue", (queue) => {
        queue.autoplay = true;
    });
};