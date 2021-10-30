'use strict'

const internal = {};

const embed  = require('../lang/embed.json');
const person = require('../constants/people.json');
const ch     = require('../constants/channels.json');
const role   = require('../constants/roles.json');
const emojis = require('../lang/emojis.json');

// Random Number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = internal.announcements = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!announcement" && message.channel.id == ch.test) {
        const gaiaAvatarURL = this.client.users.get(person.Gaia).avatarURL;
        var title, description;
        var ping = " ";
        var user = message.author;
        var author = message.guild.members.get(user.id).displayName;

        // reactionFilter
        const reactionFilter = (reaction, user) => {return [
          emojis.one,                  // announcements Channel
          emojis.two,                  // staff_announcements Channel
          emojis.three,                // test Channel

          emojis.globe_with_meridians, // Everyone
          emojis.large_blue_circle,    // Here

          emojis.earth_americas,       // Player Help Team
          emojis.gear,                 // Arkitect Team

          emojis.x                     // Cancel
        ].includes(reaction.emoji.name) && user.id != person.Gaia};

        message.delete();

        // What do you want the title to be?
        message.channel.send({ embed: {
          color: embed.colorYellow,
          title: "What do you want the title to be?",
        } });

        // Await Title
        message.channel.awaitMessages(message => message.content.includes(""), { max: 2, time: 9999999, errors: ['time'] })
        .then(collected => {
          title = (collected.last().content);
          (collected.last()).delete();

          // Fetch firstMessage
          this.client.channels.get(ch.test).fetchMessages().then(messages => {
            const fetchFilter = messages.filter(message => message.author.bot);
            const botMessage = fetchFilter.first();

            // What do you want the announcement to be?
            botMessage.edit({ embed: {
              color: embed.colorYellow,
              title: "What do you want the announcement to be?"
            } });

            // Await announcement
            message.channel.awaitMessages(message => message.content.includes(""), { max: 1, time: 9999999, errors: ['time'] })
            .then(collected => {
              description = (collected.last().content);
              (collected.last()).delete();

              // What channel do you want to enter?
              botMessage.edit({ embed: {
                color: embed.colorYellow,
                title: "What channel do you want to enter?",
                description: `${emojis.one} = <#${ch.announcements}>
                            \n${emojis.two} = <#${ch.staff_announcements}>
                            \n
                            \n${emojis.x} = Cancel`
              } })
              .then(() => botMessage.react(emojis.one)) // announcements
              .then(() => botMessage.react(emojis.two)) // staff_announcements
              .then(() => botMessage.react(emojis.x))   // Cancel

              // Await Channel
              botMessage.awaitReactions(reactionFilter, { max: 1, time: 99999999, errors: ['time'] })
              .then(collected => {
                const reaction = collected.first();
                botMessage.clearReactions();

                // If channel announcements
                if (reaction.emoji.name == emojis.one) {

                  // Submitted (announcements)
                  botMessage.edit({ embed: {
                    color: embed.colorGreen,
                    title: "**Submitted!**"
                  }})
                  .then(message => {
                    message.delete(3000)
                  });

                  // Title (announcements)
                  this.client.channels.get(ch.announcements).send(`@everyone **${title}**`)
                  // Embed (announcements)
                  this.client.channels.get(ch.announcements).send({ embed: {
                    color: embed.embedColor[getRandomInt(0,9)],
                    author: {
                      name: author,
                      icon_url: user.avatarURL,
                    },
                    description: description,
                    footer: {
                      icon_url: gaiaAvatarURL,
                      text: (`Posted by Gaia`),
                    },
                  } }); // Embed (announcements)
                }; // If channel announcements

                // If channel staff announcements
                if (reaction.emoji.name == emojis.two) {
            
                  // Who do you want to notify? (staff_announcements)
                  botMessage.edit({ embed: {
                    color: embed.colorYellow,
                    title: "Who do you want to ping?",
                    description: `${emojis.globe_with_meridians} = Everyone
                                \n${emojis.large_blue_circle} = Here
                                \n
                                \n${emojis.earth_americas} = Player Help Team
                                \n${emojis.gear} = Arkitect Team
                                \n
                                \n${emojis.x} = Cancel`
                  } })

                  // Ping Reaction (staff_announcements)
                  .then(() => botMessage.react(emojis.globe_with_meridians)) // Everyone
                  .then(() => botMessage.react(emojis.large_blue_circle))    // Here

                  .then(() => botMessage.react(emojis.earth_americas))       // Player_Team
                  .then(() => botMessage.react(emojis.gear))                 // Arkitect_Team

                  .then(() => botMessage.react(emojis.x))                    // Cancel

                  // Await ping (staff_announcements)
                  botMessage.awaitReactions(reactionFilter, { max: 1, time: 99999999, errors: ['time'] })
                  .then(collected => {
                    const reaction = collected.first();
                    botMessage.clearReactions();
                      if (reaction.emoji.name == emojis.globe_with_meridians) {ping = "@everyone"};
                      if (reaction.emoji.name == emojis.large_blue_circle)    {ping = "@here"};

                      if (reaction.emoji.name == emojis.earth_americas)       {ping = `<@&${role.player_team}>`};
                      if (reaction.emoji.name == emojis.gear)                 {ping = `<@&${role.arkitect_team}>`};

                    // Cancel => Submit (staff_announcements)
                    if (reaction.emoji.name == emojis.x) {

                      // Cancel
                      botMessage.edit({ embed: {
                        color: embed.colorRed,
                        title: "**Canceled**"
                      }})
                      .then(message => {
                        message.delete(3000)
                      });

                      return;
                    } else { // Cancel => Submit (staff_announcements)

                      // Submitted (staff_announcements)
                      botMessage.edit({ embed: {
                        color: embed.colorGreen,
                        title: "**Submitted!**"
                      }})
                      .then(message => {
                        message.delete(3000)
                      });

                      // Title (staff_announcements)
                      this.client.channels.get(ch.staff_announcements).send(`${ping} **${title}**`)
                      // Embed (staff_announcements)
                      this.client.channels.get(ch.staff_announcements).send({ embed: {
                        color: embed.embedColor[getRandomInt(0,9)],
                        author: {
                          name: author,
                          icon_url: user.avatarURL,
                        },
                        description: description,
                        footer: {
                          icon_url: gaiaAvatarURL,
                          text: (`Posted by Gaia`),
                        },
                      } }); // Embed (staff_announcements)
                    }; // Cancel => Submit (staff_announcements)
                }); // Await ping (staff_announcements)
              }; // If channel staff announcements
              // Cancel
              if (reaction.emoji.name == emojis.x) {
                botMessage.edit({ embed: {
                  color: embed.colorRed,
                  title: "**Canceled**"
                }})
                .then(message => {
                  message.delete(3000)
                });
                return;
              }; // Cancel
            }); // Await Channel
          }); // Await announcement
        }); // Fetch firstMessage
      }) // Await Title
    };
  };
};