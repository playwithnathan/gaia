'use strict'

const internal = {};

const ch     = require('../constants/channels.json');
const embed  = require('../lang/embed.json');
const person = require('../constants/people.json');
const Jimp   = require('jimp');

module.exports = internal.guildMemberAdd = class {
  constructor(client, discord) {

    client.on('guildMemberAdd', async member => {
        const gaiaAvatarURL = client.users.get(person.Gaia).avatarURL;
        const memberJoin = client.emojis.find(emoji => emoji.name == "memberJoin");
  
        // Embed
        client.channels.get(ch.gaia_log).send({ embed: {
            color: embed.colorGreen,
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL,
            },
            title: `${memberJoin} User Joined`,
            fields: [
                {
                    name: "User:",
                    value: `<@${member.id}>`,
                    inline: false,
                },
                {
                    name: "User Created:",
                    value: (new Date(member.user.createdAt).toLocaleDateString()),
                    inline: false,
                }
            ],
            footer: {
                icon_url: gaiaAvatarURL,
                text: (`Posted by Gaia`),
            },
        } }); // Embed

        const sans_thirty_two_black = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        const mask = Jimp.read("./img/mask.png");

        var squareAvatar = await Jimp.read(member.user.displayAvatarURL.replace('.gif', '.png'))
        squareAvatar     = squareAvatar.resize(128, 128);

        var originalBackground = await Jimp.read(`./img/main.png`)
        originalBackground     = originalBackground.resize(850, 250);
        originalBackground     = originalBackground.print(sans_thirty_two_black,220,85,(member.user.tag))
        originalBackground     = originalBackground.print(sans_thirty_two_black,220,135,(`User Created: ${(new Date(member.user.createdAt)).toLocaleDateString()}`))
        
        Promise.all([squareAvatar, mask, originalBackground]).then(async function(images) {
            var squareAvatar = images[0];
            var mask         = images[1];
            var background   = images[2];

            const masked     = squareAvatar.mask(mask, 0, 0);
            background       = background.composite(masked, 61, 61);

            const attachment = new discord.Attachment(await background.getBufferAsync(Jimp.MIME_PNG), `welcome.png`);
            client.channels.get(ch.general).send(attachment);
        });
    });
  };
};