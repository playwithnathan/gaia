'use strict'

const internal = {};

const embed  = require('../lang/embed.json');
const person = require('../constants/people.json');
const ch     = require('../constants/channels.json');

module.exports = internal.staffrules = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!staffrules" && message.channel.id == ch.test) {
      const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;
      
      var channel = ch.staff_rules;
      this.client.channels.get(channel).send("__**Arkitect Team**__");
      this.client.channels.get(channel).send(embed.builder);
      this.client.channels.get(channel).send(embed.dev);
      this.client.channels.get(channel).send(embed.arkitect);

      this.client.channels.get(channel).send("__**Player-Help Team**__");
      //this.client.channels.get(channel).send(embed.owl);
      this.client.channels.get(channel).send(embed.argo);
      this.client.channels.get(channel).send(embed.sr_argo);
      this.client.channels.get(channel).send(embed.angler);
    };
  };
};