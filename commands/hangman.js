'use strict'

const internal = {};

const emojis  = require('../lang/emojis.json');
const hangman = require('../lang/hangman.json');
const letters = emojis.all_letters;
const unicode = hangman.unicode;
var games     = [];
const stages  = hangman.stage;

// Random Number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = internal.hangman = class {
    constructor(client) {
      this.client  = client;
      this.request = require('request');
  }

    // Message Handler
    onChat(message) {
      if (message.content.toLowerCase() == "!hangman" && message.channel.type != "dm") {
        message.delete()

        message.channel.send(stages[0]).then(m => {
          nextLetter(m, 0, (hangman.secretWord[getRandomInt(0, 704)]).toLowerCase() );
        });
        
        function generateMessage(phrase, guesses) {
          var s = "";
          for(var i = 0; i < phrase.length; i++) {
              if(phrase[i] == ' ')
                  s += " ";
              else {
                  var c = phrase[i];
                  if(guesses.indexOf(c) == -1)
                      c = "\\_";
                  s += "__" + c + "__ ";
              }
          }
          return s;
        }

        function nextLetter(message, index, word) {
          message.react(letters[index]).then(r => {
            index++;
            if(index < letters.length) {
             if(index == 13) {
              message.channel.send(generateMessage(word, [])).then(m => {
                console.log(`[game] [hangman] [${message.channel.name}] ${word}`);

                games.push({
                  stage: 0,
                  msg0: message,
                  msg1: m,
                  phrase: word,
                  guesses: []
                });
                nextLetter(m, index);
              });
            } else {
              nextLetter(message, index, word);
            }
          }
        });
        };

        this.client.on('messageReactionAdd', (reaction, user) => {
          var msg = reaction.message;
          if (!user.bot) {
              for (var i = 0; i < games.length; i++) {
                  var game = games[i];
                  if ((msg.id == game.msg0.id || msg.id == game.msg1.id) && game.stage < stages.length) {
                      var letter = unicode[letters.indexOf(reaction.emoji.name)];
                      
                      reaction.fetchUsers().then(usrs => {
                          var reactors = usrs.array();
                          var remove_next = function(index) {
                              if (index < reactors.length)
                              reaction.remove(reactors[index]).then(() => remove_next(index + 1));
                          };
                          remove_next(0);
                      });
                      
                      if (game.guesses.indexOf(letter) == -1) {
                          game.guesses.push(letter);
                          if (game.phrase.indexOf(letter) == -1) {
                              game.stage ++;
                              game.msg0.edit(stages[game.stage]);
                          } else {
                              var sik = true;
                              for (var j = 0; j < game.phrase.length; j++) {
                                  var c = game.phrase[j];
                                  if(c != ' ' && game.guesses.indexOf(c) == -1) {
                                      sik = false;
                                  }
                              }

                              if (sik) {
                                  game.msg0.clearReactions();
                                  game.msg1.delete();

                                  game.msg0.edit(hangman.win)
                                  .then(message =>{
                                    message.delete(10000);
                                  });
                              } else {
                                game.msg1.edit(generateMessage(game.phrase, game.guesses));
                              };
                          };
                      };
                  };
                  games[i] = game;
              };
          };
        });
      }; // Commands
    }; // Message Handler
};