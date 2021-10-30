'use strict'

const internal = {};

const triggerArray = require('../lang/swears.json');
const person       = require('../constants/people.json');
const ch           = require('../constants/channels.json');
const embed        = require('../lang/embed.json');

module.exports = internal.swearProtection = class {
    constructor(client) {
        this.client  = client;
    };

    onChat(message) {
        this.handler(message);
    };

    async handler(message) {
        const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;
        var phrase   = message.content.toLowerCase();

        for (var i = 0; i < triggerArray.length; i++) {
            var triggersSpaced = triggerArray[i];
            var key = triggersSpaced.split('').join(' ').trim();

            var find_word = new RegExp('(\\S*)?('+triggersSpaced+')(\\S*)?','gi');
            find_word = phrase.match(find_word);

            var find_word_spaced = new RegExp('(\\S*)?('+key+')(\\S*)?','gi');
            find_word_spaced = phrase.match(find_word_spaced);

            if (find_word == triggersSpaced) {
                message.delete();

                if (message.author.id != "640670964954169356") {
                    this.client.users.get(message.author.id).send('Staff has been notified of your language.')
                };
                
                this.client.channels.get(ch.punishments).send({ embed: {
                    color: embed.colorRed,
                    title: 'Swear Protection',
                    fields: [
                        {
                            name: 'User:',
                            value: `<@${message.author.id}>`,
                            inline: false,
                        },
                        {
                            name: 'Swear:',
                            value: message.content,
                            inline: false,
                        },
                    ],
                    footer: {
                        icon_url: gaiaAvatarURL,
                        text: (`Posted by Gaia`),
                    },
                } });

                return;
            };

            if (find_word_spaced == key) {
                message.delete();
                this.client.users.get(message.author.id).send('Staff has been notified of your language.');
                
                this.client.channels.get(ch.punishments).send({ embed: {
                    color: embed.colorRed,
                    title: 'Swear Protection',
                    fields: [
                        {
                            name: 'User:',
                            value: `<@${message.author.id}>`,
                            inline: false,
                        },
                        {
                            name: 'Swear:',
                            value: message.content,
                            inline: false,
                        },
                    ],
                    footer: {
                        icon_url: gaiaAvatarURL,
                        text: (`Posted by Gaia`),
                    },
                } });
                
                return;
            };
        };
    };
};