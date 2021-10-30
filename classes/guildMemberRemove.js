'use strict'

const internal = {};

const ch     = require('../constants/channels.json');
const embed  = require('../lang/embed.json');
const person = require('../constants/people.json');

module.exports = internal.guildMemberRemove = class {
    constructor(client) {

        client.on('guildMemberRemove', member => {
            const gaiaAvatarURL = client.users.get(person.Gaia).avatarURL;
            const memberLeave = client.emojis.find(emoji => emoji.name == "memberLeave");
  
            // Embed
            client.channels.get(ch.gaia_log).send({ embed: {
                color: embed.colorRed,
                author: {
                    name: `${member.user.tag}`,
                    icon_url: member.user.displayAvatarURL,
                },
                title: `${memberLeave} User Left`,
                fields: [
                    {
                        name: "User:",
                        value: `<@${member.id}>`,
                        inline: false,
                    },
                    {
                        name: "User Created:",
                        value: (new Date(member.user.createdAt).toLocaleDateString()),
                        inline: false
                    },
                    {
                        name: "User Joined:",
                        value: (new Date(member.joinedAt).toLocaleDateString()),
                        inline: false,
                    }
                ],
                footer: {
                    icon_url: gaiaAvatarURL,
                    text: (`Posted by Gaia`),
                },
            } }); // Embed
        });
    };
};