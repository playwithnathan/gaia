'use strict'

const internal = {};

const ch     = require('../constants/channels.json');
const embed  = require('../lang/embed.json');
const person = require('../constants/people.json')

module.exports = internal.message_log = class {
    constructor(client) {
        this.client = client;
    }

    onChat(message) {
        const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;

        // Guild Chat
        if ((message.channel.id != ch.console) &&
            (message.channel.id != ch.global) &&
            (message.channel.id != ch.staff) &&
            (message.channel.id != ch.song_requests) &&
            (message.channel.id != ch.rythm) &&
            (message.channel.id != ch.rythm2) &&
            (message.channel.id != ch.gaia_log) &&
            (message.channel.name != undefined)) {
                console.log(`[message_log] [guild] [${message.channel.name}] ${message.author.username}: ${message.content}`);
            }

        // DM
        if (message.channel.type == "dm" && message.author.id != person.Gaia) {
            console.log(`[message_log] [dm] [${message.channel.id}] ${message.author.username}: ${message.content}`)
            
            this.client.channels.get(ch.gaia_log).send({ embed: {
                color: embed.colorBlue,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL,
                },
                title: `DM ${message.author.id}`,
                description: message.content,
                footer: {
                    icon_url: gaiaAvatarURL,
                    text: (`Posted by Gaia`),
                },
            } });
        }
    };
};