'use strict'

const internal = {};

const ch    = require("../constants/channels.json");
const embed = require("../lang/embed.json");

// Random Number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = internal.pangea = class {
  constructor(client) {
    this.client = client;
  }

  onChat(message) {
    if (message.content.toLowerCase() == "!pangea") {
        message.delete();

        message.channel.send({ embed: {
            color: embed.colorRed,
            title: "Confirm Signature"
        } })
        .then(message => {
            message.delete(3000);
        });

        message.channel.awaitMessages(message => message.content.includes(""), { max: 2, time: 9999999, errors: ['time'] })
        .then(collected => {
            const msg = collected.last();
            msg.delete();

            if (msg.content == "!confirm") {
                var first_percent   = getRandomInt(1,               10)
                var second_percent  = getRandomInt(first_percent,   20)
                var third_percent   = getRandomInt(second_percent,  30)
                var fourth_percent  = getRandomInt(third_percent,   40)
                var fifth_percent   = getRandomInt(fourth_percent,  50)
                var sixth_percent   = getRandomInt(fifth_percent,   60)
                var seventh_percent = getRandomInt(sixth_percent,   70)
                var eigth_percent   = getRandomInt(seventh_percent, 80)
                var ninth_percent   = getRandomInt(eigth_percent,   90)
                var tenth_percent   = getRandomInt(ninth_percent,  99)

                message.channel.send("``Starting Terrain Generation...``");

                this.client.channels.get(msg.channel.id).fetchMessages({ limit: 1 }).then(messages => {
                    const msg2 = messages.first();

                          msg2.edit("``Generating [▓░░░░░░░░░░░] 0%``")
                    .then(msg2.edit("``Generating [▓▓░░░░░░░░░░] " + first_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓░░░░░░░░░] " + second_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓░░░░░░░░] " + third_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓░░░░░░░] " + fourth_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓▓░░░░░░] " + fifth_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓▓▓░░░░░] " + sixth_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓▓▓▓░░░░] " + seventh_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓▓▓▓▓░░░] " + eigth_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓▓▓▓▓▓░░] " + ninth_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓▓▓▓▓▓▓░] " + tenth_percent + "%``"))
                    .then(msg2.edit("``Generating [▓▓▓▓▓▓▓▓▓▓▓▓] 100%``"))
                    .then(msg2.edit("``Finished Terrain Generation!``"))
                    .then(
                    first_percent   = getRandomInt(1,               10),
                    second_percent  = getRandomInt(first_percent,   20),
                    third_percent   = getRandomInt(second_percent,  30),
                    fourth_percent  = getRandomInt(third_percent,   40),
                    fifth_percent   = getRandomInt(fourth_percent,  50),
                    sixth_percent   = getRandomInt(fifth_percent,   60),
                    seventh_percent = getRandomInt(sixth_percent,   70),
                    eigth_percent   = getRandomInt(seventh_percent, 80),
                    ninth_percent   = getRandomInt(eigth_percent,   90),
                    tenth_percent   = getRandomInt(ninth_percent,  99),
                    )
                    .then(msg2.edit("``Starting Video Rendering...``"))
                    .then(msg2.edit("``Rendering [▓░░░░░░░░░░░] 0%``"))
                    .then(msg2.edit("``Rendering [▓▓░░░░░░░░░░] " + first_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓░░░░░░░░░] " + second_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓░░░░░░░░] " + third_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓░░░░░░░] " + fourth_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓▓░░░░░░] " + fifth_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓▓▓░░░░░] " + sixth_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓▓▓▓░░░░] " + seventh_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓▓▓▓▓░░░] " + eigth_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓▓▓▓▓▓░░] " + ninth_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓▓▓▓▓▓▓░] " + tenth_percent + "%``"))
                    .then(msg2.edit("``Rendering [▓▓▓▓▓▓▓▓▓▓▓▓] 100%``"))
                    .then(msg2.edit("``Finished Video Rendering!``"))
                    .then(msg2.edit("``Sending Rendered Generation``"))
                    .then(msg2.edit({ embed: {
                        color: embed.colorGreen,
                        title: "Pangea",
                        image: {
                            "url": "https://i.imgur.com/NF6G6h9.jpeg"
                        }
                    } })
                    );
                });
            } else {
                msg.channel.send({ embed: {
                    color: embed.colorRed,
                    title: "[Error] Failed: Signature Confirmation"
                } })
                .then(message => {
                    message.delete(5000);
                });
            };
        });
      };
  };
};

