'use strict'

const internal = {};

const embed = require('../lang/embed.json');

module.exports = internal.highfive = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.startsWith("!highfive") && message.channel.type != "dm") {
      
        if (message.mentions.users.size < 1) return message.channel.send(`${message.author} You can't high-five nobody!`)
        .then(message => {
          message.delete(3000);
        });
        const user = message.mentions.users.first();

        if (user.id == message.author.id) {
          message.channel.send({ embed: {
            color: embed.colorRed,
            description: `${user} You got a high-five from ${message.author}`,
            image: {
                url: "https://i.imgur.com/NUS5qGI.gif"
            }
        } });
        } else if (user.id != message.author.id) {
          message.channel.send({ embed: {
              color: embed.colorGold,
              description: `${user} You got a high-five from ${message.author}`,
              image: {
                  url: "https://i.imgur.com/7BJ6gfM.gif"
              }
          } });
        };
    };
  };
};