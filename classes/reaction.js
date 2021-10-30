'use strict'

const internal = {};

const triggerArrays = require('../lang/reactions.json');
const ch            = require('../constants/channels.json');

module.exports = internal.reactions = class {
    constructor(client) {
        this.client  = client;
    };

    onChat(message) {
        if (message.channel.id == ch.global) { return; }
        if (message.channel.id == ch.staff)  { return; }
        if (message.channel.id == ch.console) { return; }
        this.handler(message);
    };

    async handler(message) {
        var phrase   = message.content.toLowerCase();
        var triggers = Object.keys(triggerArrays);

        for (var i = 0; i < triggers.length; i++) {
            var triggersSpaced = triggers[i];
            var key = triggersSpaced.split('').join(' ').trim();

            var find_word = new RegExp('(\\S*)?('+triggersSpaced+')(\\S*)?','gi');
            find_word = phrase.match(find_word);

            var find_word_spaced = new RegExp('(\\S*)?('+key+')(\\S*)?','gi');
            find_word_spaced = phrase.match(find_word_spaced);

            if (find_word == triggersSpaced) {
                var emojis = triggerArrays[triggersSpaced];
                
                for (var x = 0; x < emojis.length; x++) {
                    await message.react(emojis[x]);
                }
                return;
            };

            if (find_word_spaced == key) {
                var emojis = triggerArrays[triggersSpaced];
            
                for (var x = 0; x < emojis.length; x++) {
                    await message.react(emojis[x]);
                }
                return;
            };
        };
    };
};