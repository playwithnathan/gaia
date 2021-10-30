/**

 * Copyright ©️ 2019-2021, Nathan Gamache.

 * All rights reserved.

 * Redistribution isn't allowed in any form.

###############################################################################################|
|                      _               _____                                                   |
|                    /   \    __  | /    |     ___     __    __     ___                        |
|                   |_____| |/  \ |/     |   /_____\ |/  \ |/  \  /    \                       |
|                   |     | |     |\     |  |        |     |     |     |                       |
|                   |     | |     | \    |   \_____  |     |      \____/\                      |
|                                                                                              |
|==============================================================================================|
|                                                                                              |
|  A bot created by playwithnathan for the ArkTerra Discord server.                            |
|                                                                                              |
|  > A multi-purpose bot designed for minecraft-based discord servers.                         |
|                                                                                              |
|  > For detailed instructions, visit the github repository and read the documentation.        |
|                                                                                              |
|===============================================================================================
|                                                                                              |
|  > For support, visit https://github.com/playwithnathan/ArkTerra/#readme                     |
|                                                                                              |
|  @name ArkTerra                                                                              |       
|  @author playwithnathan < play.with.nathan@gmail.com >                                       |
|  @version R3.0                                                                               |
|                                                                                              |
|##############################################################################################|
*/

/* ArkTerra */
const discord = require('discord.js');
const client  = new discord.Client();

const config  = require('./config.json');
const classes = {};

const ch      = require('./constants/channels.json');
const embed   = require('./lang/embed.json');
const emojis  = require('./lang/emojis.json');
const role    = require('./constants/roles.json');
const person  = require('./constants/people.json');

const fs      = require('fs');
const util    = require('util');
const mcping  = require('mc-ping-updated');
const readdir = util.promisify(fs.readdir);

const folders = config.folders;

// Discord Info
function discordInfo() {
    console.log(`[discord] [get_user] ${client.users.size}`);
    console.log(`[discord] [get_channel] ${client.channels.size}`);
};

// Status
function getServerStatus() {
    mcping("144.48.105.126", "25069", function(err, res) {
    if (!(typeof err == 'undefined' || err == null)) {
        client.user.setStatus('dnd');
        var serverStatus = 'Server offline';
        client.channels.get(ch.status).setName(emojis.hand_point_right + 'Server Offline');
        client.user.setActivity(serverStatus, { type: 'PLAYING' });
        console.error(err);
        return;
    }
    if (res.players.sample) { client.user.setStatus('ONLINE') } else { client.user.setStatus('IDLE') }
    serverStatus = res.players.online + ' / ' + res.players.max;
    var onlinePlayers = res.players.online;
    client.user.setActivity(serverStatus, { type: 'PLAYING' });
    client.channels.get(ch.status).setName(emojis.hand_point_right + ' ' + (onlinePlayers) + ' players online');
    console.log(`[mc] [player_count] ${serverStatus}`)
    })
};

// Update readMe
function updateReadMe() {
    const gaiaAvatarURL = client.users.get(person.Gaia).avatarURL;
    client.channels.get(ch.read_me_first).fetchMessages({ limit: 1 }).then(messages => {
        const server = messages.first().guild;

        function status(string) {
            return string
            .replace(/(?<![A-Z])online(?![A-Z])/gi, emojis.large_green_circle)
            .replace(/(?<![A-Z])idle(?![A-Z])/gi, emojis.crescent_moon)
            .replace(/(?<![A-Z])dnd(?![A-Z])/gi, emojis.large_red_circle)
            .replace(/(?<![A-Z])offline(?![A-Z])/gi, emojis.large_black_circle);
        }

        var owners    = server.roles.get(role.owner).members.map(m => `${status(m.user.presence.status)}<@${m.user.id}>`).join('\n');
        var anglers   = server.roles.get(role.angler).members.map(m => `${status(m.user.presence.status)}<@${m.user.id}>`).join('\n');

        var sr_argos  = server.roles.get(role.sr_argo).members.map(m => `${status(m.user.presence.status)}<@${m.user.id}>`).join('\n');
        var argos     = server.roles.get(role.argo).members.map(m => `${status(m.user.presence.status)}<@${m.user.id}>`).join('\n');
        var owls      = server.roles.get(role.owl).members.map(m => `${status(m.user.presence.status)}<@${m.user.id}>`).join('\n');

        var arkitects = server.roles.get(role.arkitect).members.map(m => `${status(m.user.presence.status)}<@${m.user.id}>`).join('\n');
        var builders  = server.roles.get(role.builder).members.map(m => `${status(m.user.presence.status)}<@${m.user.id}>`).join('\n');

        if (anglers == "")   {anglers = `${emojis.large_black_circle}No Anglers`};

        if (sr_argos == "")  {sr_argos = `${emojis.large_black_circle}No Senior Argonauts`};
        if (argos == "")     {argos = `${emojis.large_black_circle}No Argonauts`};
        if (owls == "")      {owls = `${emojis.large_black_circle}No Owls`};

        if (arkitects == "") {arkitects = `${emojis.large_black_circle}No Arkitects`};
        if (builders == "")  {builders = `${emojis.large_black_circle}No Builders`};

        messages.first().edit({ embed: {
            color: embed.defaultColor,
            description: (`${embed.readmefirst}\n__**Staff:**__\n\n**Administration**\nOwner\n${owners}\n\nAngler (Admin)\n${anglers}\n\n**Player-Help Team**\nSenior Argonauts (Lead Mod)\n${sr_argos}\n\nArgonaut (Moderator)\n${argos}\n\nOwl (Helper)\n${owls}\n\n**Arkitect Team**\nArkitect\n${arkitects}\n\nBuilder\n${builders}\n\n${emojis.large_green_circle} = Online\n${emojis.crescent_moon} = Idle\n${emojis.large_red_circle} = Do Not Disturb\n${emojis.large_black_circle} = Offline`),
            footer: {
                icon_url: gaiaAvatarURL,
                text: ('Posted by Gaia'),
            },
        } });
    });
};

// Load Classes
async function load_classes() {
  var count = 1;
      
  for (var i = 0; i < folders.length; i++) {
    var folder = folders[i];
      
    var files = await readdir(`./${folders[i]}/`); 
      
    for (var x = 0; x < files.length; x++) {
      var file  = files[x];
      var ext   = file.split('.')[1];
          
      if (ext == 'js') { 
        var inc   = require(`./${folder}/${file}`);
        classes[file] = new inc(client, discord);
        console.log(`[start_session] [Loader] [${count}] Loaded class ${folder}/${file}`);
        count++;
      };
    };
  };
};

client.on("ready", async () => {
    getServerStatus();
    updateReadMe();

    console.log(`[start_session] [Loader] [0] Loading files...`);
    await load_classes();
    console.log(`[start_session] [Loader] Loading finished`);
    console.log(`[start_session] [discord] [get_user] ${client.users.size}`);
    console.log(`[start_session] [discord] [get_channel] ${client.channels.size}`);
    
    client.setInterval(updateReadMe,    (config.pingInterval * 100));
    client.setInterval(getServerStatus, (config.pingInterval * 1000));
    client.setInterval(discordInfo,     (config.pingInterval * 10000));

    console.log(`[start_sesion] Gaia is online!`)
});

client.on('message', (message) => {
  if (classes) {
    var keys = Object.keys(classes);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (typeof classes[key].onChat == 'function') {
        classes[key].onChat(message);
      }
    }
  }
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.login(config.token);