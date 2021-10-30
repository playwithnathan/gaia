'use strict'

const internal = {};

const embed = require('../lang/embed.json')

module.exports = internal.owl = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!builder" && message.channel.parentID == '639201576095055877') {
      message.channel.send({ embed: {
        color: embed.colorGold,
        title: "Builder Application",
        description: embed.builderApp
      } });
    };
  };
};