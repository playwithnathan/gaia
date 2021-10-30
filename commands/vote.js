'use strict'

const internal = {};

const person = require('../constants/people.json');
const embed  = require('../lang/embed.json');

module.exports = internal.vote = class {
  constructor(client, discord) {
    this.client  = client;
    this.discord = discord;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!vote" && message.channel.type != "dm") {
      const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;

      message.channel.send({ embed: {
        color: embed.colorPurple,
        title: "Voting Sites",
        description: "https://topg.org/Minecraft/server-593805\nhttps://minecraft-mp.com/server-s244502",
        footer: {
          icon_url: gaiaAvatarURL,
          text: (`Posted by Gaia`),
        }
      } })
      .then(message => {
        message.delete(5000);
      });
    };
  };
};