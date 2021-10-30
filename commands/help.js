'use strict'

const internal = {};

const embed  = require('../lang/embed.json');
const person = require('../constants/people.json');

module.exports = internal.help = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!help" && message.channel.type != "dm") {
      const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;

      message.channel.send({ embed: {
        color: embed.colorLightBlue,
        title: 'Info',
        fields: [
          {
            name: 'IP:',
            value: "play.arkterramc.com",
            inline: false,
          },
          {
            name: 'Version:',
            value: "1.15.2",
            inline: false,
          },
          {
            name: 'Website:',
            value: 'https://www.arkterramc.com/',
            inline: false,
          },
        ],
        footer: {
          icon_url: gaiaAvatarURL,
          text: `Posted by Gaia`,
        },
      } });
    };
  };
};