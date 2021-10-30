'use strict'

const internal = {};

const embed  = require('../lang/embed.json');
const vibes  = require('../lang/vibes');
const person = require('../constants/people.json');

module.exports = internal.vibe = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!vibe" && message.channel.type != "dm") {
      const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;
      let user = message.guild.member(message.mentions.users.first());

      if (user != undefined) {
          message.channel.send({ embed: {
              color: embed.colorGreen,
              title: 'Vibe Checker',
              fields: [
                  {
                      name: "User:",
                      value: `${user}`,
                      inline: false
                  },
                  {
                      name: "Vibe:",
                      value: vibes[Math.floor(Math.random () * vibes.length)],
                      inline: false
                  },
              ],
              footer: {
                  icon_url: gaiaAvatarURL,
                  text: ('Posted by Gaia')
                }
          } })
          .then(message => {
              message.delete(5000);
          });
      } else {
          message.channel.send({ embed: {
              color: embed.colorGreen,
              title: 'Vibe Checker',
              fields: [
                  {
                      name: "User:",
                      value: `${message.author}`,
                      inline: false
                  },
                  {
                      name: "Vibe:",
                      value: vibes[Math.floor(Math.random () * vibes.length)],
                      inline: false
                  },
              ],
              footer: {
                  icon_url: gaiaAvatarURL,
                  text: ('Posted by Gaia'),
                },
          } })
          .then(message => {
              message.delete(5000);
          });
      };
    };
  };
};