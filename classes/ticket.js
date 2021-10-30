'use strict'

const internal = {};

const embed = require('../lang/embed.json')

module.exports = internal.owl = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.includes("What do you need help with?") && message.author.id == '557628352828014614') {
      message.channel.send({ embed: {
        color: embed.colorYellow,
        description: embed.ticket
      } });
    };
  };
};