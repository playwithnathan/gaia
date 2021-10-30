'use strict'

const internal = {};

const ch       = require('../constants/channels.json');
const response = require('../lang/responses.json');
const config   = require('../config.json');

module.exports = internal.ai = class {
  constructor(client, core) {
    this.client = client;
    this.core   = core;
  }

  onChat(message) {
    if ((message.channel.id != ch.announcements) &&
        (message.channel.id != ch.staff_announcements) &&
        (message.channel.id != ch.gaia_log) &&
        (message.channel.id != ch.test) &&
        (message.channel.id != ch.song_requests) &&
        (message.channel.id != ch.rythm) &&
        (message.channel.id != ch.rythm2) &&
        (message.channel.id != ch.console)) {
      this.handler(message);
    };
  };

  findmention() {
    var phrase = this.phrase;
        
    if( phrase.indexOf('»') > -1 ) {
      var tmp = phrase.split('»');
      phrase = tmp[1].trim();
    }

    phrase = phrase.replace(/[^0-9a-z ]+/gi, '');
    this.phrase = phrase;
		
    if( phrase.indexOf(config.madlib_trigger) > -1 ) {
      phrase = phrase
        .replace(' u ', ' you ')
        .replace(' ur ', ' your ')
        .replace(' r ', ' are ');
                                 
      var phraseArray = phrase.split(' ');
      var lastword    = phraseArray[phraseArray.length - 1];
      var firstword   = phraseArray[0];
      var firstphrase = phraseArray[0] + ' ' + phraseArray[1];
            
      if( lastword == config.madlib_trigger || firstword == config.madlib_trigger || firstphrase == 'hey ' + config.madlib_trigger ) {
        phrase = phrase.trim();
              
        var re = new RegExp('hey ' + config.madlib_trigger, 'ig');
        phrase = phrase.replace(re, '');
              
        re = new RegExp(config.madlib_trigger, 'ig');
        phrase = phrase.replace(re, '');
              
        return phrase;
      }
    } else {
      return false;
    }
  }

  async madlib(content, response) {
    var definitions, focus, needle, word, response, re;
        
    definitions = response.definitions[0];
        
    for(var key in definitions) {
      focus = response.definitions[0][key];
          
      needle = '%'+key+'%';
      word = focus[Math.floor(Math.random() * focus.length)];
      re = new RegExp(needle, 'ig');
      content = content.replace(re, word);
    } 
    return content;
  }
    
  async findMessageTriggers() {
	  var message = this.message;
    var phrase  = this.phrase;
    var default_id, matched_id, matched, reply, focus, finder, trigger, search, mention;
        
    // Remove hard mentions from phrase
    mention = phrase.substring(
      phrase.lastIndexOf('<@!') + 3, 
      phrase.lastIndexOf('>')
    ) + '';
        
    phrase = phrase.replace('<@!'+mention+'>', '');
    // end hard mention
        
    matched  = ' ';
      
    for(var category in response) {
      //exclude the definitions
      if( category != 'definitions' ) {
        //try to match a trigger
        trigger = response[category][0].trigger;
                
        search = trigger.forEach(await function (needle) {
          finder = phrase.search(needle);
                                              
          if( needle == 'default' ) default_id = category;

          if( finder > -1 && needle.length > matched.length ) {
            matched_id = category;
            matched    = needle;
          }
        }); 
      }
    }
        
    if (matched_id) {
      focus = response[matched_id][0].reply;
    } else {
      focus = response[default_id][0].reply;
    }

    reply = focus[Math.floor(Math.random() * focus.length)];
    reply = await this.madlib(reply, response);
        
    message.channel.startTyping(1);
      this.client.setTimeout(function() {
        message.channel.send(reply)
        .then(function() {
          message.channel.stopTyping(true);
        });
      }, 2000);
    return reply;
  }
    
  async handler(message) {
    this.message = message;
    this.phrase = message.content.toLowerCase();

    var mention = this.findmention();
    if (mention) {
      this.findMessageTriggers();
      return true;
    }
  };
};