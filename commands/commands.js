'use strict'

const internal = {};

const embed  = require('../lang/embed.json');
const person = require('../constants/people.json');

module.exports = internal.commands = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!commands" && message.channel.type != "dm") {
      const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;
      
      message.channel.send({ embed: {
        color: embed.colorLightBlue,
        title: 'Commands',
        description: "- ``!info``\nShows server info\n- ``!vibe``\nGet your vibe\n- ``!highfive @``\nHigh five someone by adding someones @ at the end\n- ``!hangman``\nPlay a game of minecraft themed hangman",                
        footer: {
          icon_url: gaiaAvatarURL,
          text: `Posted by Gaia`,
        },
      } });
    };
  };
};