'use strict'

const internal = {};

const Jimp   = require('jimp');
const role   = require('../constants/roles.json');
const person = require('../constants/people.json');

module.exports = internal.userinfo = class {
  constructor(client, discord) {
    this.client  = client;
    this.discord = discord;
  }

  async onChat(message) {
      if (message.content.startsWith("!user info")) {

        const mask = Jimp.read("./img/mask.png");
        const gaia = this.client.users.get(person.Gaia);
        const user = message.mentions.members.first();
        const Discord = this.discord;
        const sans_thirty_two_black = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

        if (user != undefined && user.id != gaia.id) {
          var rank = "main";
          if (user.roles.has(role.imp))      {rank = "imp"};
          if (user.roles.has(role.origin))   {rank = "origin"};

          if (user.roles.has(role.partner))  {rank = "partner"};
          if (user.roles.has(role.builder))  {rank = "builder"};
          if (user.roles.has(role.dev))      {rank = "dev"};
          if (user.roles.has(role.arkitect)) {rank = "arkitect"};

          if (user.roles.has(role.owl))      {rank = "owl"};
          if (user.roles.has(role.argo))     {rank = "argo"};
          if (user.roles.has(role.sr_argo))  {rank = "sr_argo"};

          if (user.roles.has(role.angler))   {rank = "angler"};
          if (user.roles.has(role.owner))    {rank = "owner"};

          var squareAvatar = await Jimp.read(user.user.displayAvatarURL.replace('.gif', '.png'))
          squareAvatar     = squareAvatar.resize(128, 128);

          var originalBackground = await Jimp.read(`./img/${rank}.png`)
          originalBackground     = originalBackground.resize(850, 250);
          originalBackground     = originalBackground.print(sans_thirty_two_black,220,60,(user.user.tag))
          originalBackground     = originalBackground.print(sans_thirty_two_black,220,100,(`User Created: ${(new Date(user.user.createdAt)).toLocaleDateString()}`))
          originalBackground     = originalBackground.print(sans_thirty_two_black,220,140,(`Joined: ${(new Date(message.guild.members.get(user.user.id).joinedAt)).toLocaleDateString()}`))
          
          Promise.all([squareAvatar, mask, originalBackground]).then(async function(images) {
            var squareAvatar = images[0];
            var mask         = images[1];
            var background   = images[2];

            const masked     = squareAvatar.mask(mask, 0, 0);
            background       = background.composite(masked, 61, 61);

            const attachment = new Discord.Attachment(await background.getBufferAsync(Jimp.MIME_PNG), `${rank}.png`);
            message.channel.send(attachment);
          });
        };

        if (user == undefined) {
          var rank = "main";
          if (message.member.roles.has(role.imp))      {rank = "imp"};
          if (message.member.roles.has(role.origin))   {rank = "origin"};
          
          if (message.member.roles.has(role.builder))  {rank = "builder"};
          if (message.member.roles.has(role.dev))      {rank = "dev"};
          if (message.member.roles.has(role.arkitect)) {rank = "arkitect"};

          if (message.member.roles.has(role.owl))      {rank = "owl"};
          if (message.member.roles.has(role.argo))     {rank = "argo"};
          if (message.member.roles.has(role.sr_argo))  {rank = "sr_argo"};

          if (message.member.roles.has(role.angler))   {rank = "angler"};
          if (message.member.roles.has(role.owner))    {rank = "owner"};

          var squareAvatar = await Jimp.read(message.author.displayAvatarURL.replace('.gif', '.png'))
          squareAvatar     = squareAvatar.resize(128, 128);

          var originalBackground = await Jimp.read(`./img/${rank}.png`)
          originalBackground     = originalBackground.resize(850, 250);
          originalBackground     = originalBackground.print(sans_thirty_two_black,220,60,(message.author.tag))
          originalBackground     = originalBackground.print(sans_thirty_two_black,220,100,(`User Created: ${(new Date(message.author.createdAt)).toLocaleDateString()}`))
          originalBackground     = originalBackground.print(sans_thirty_two_black,220,140,(`Joined: ${(new Date(message.guild.members.get(message.author.id).joinedAt)).toLocaleDateString()}`))
        
          Promise.all([squareAvatar, mask, originalBackground]).then(async function(images) {
            var squareAvatar = images[0];
            var mask         = images[1];
            var background   = images[2];

            const masked     = squareAvatar.mask(mask, 0, 0);
            background       = background.composite(masked, 61, 61);

            const attachment = new Discord.Attachment(await background.getBufferAsync(Jimp.MIME_PNG), `${rank}.png`);
            message.channel.send(attachment);
          });
        };

        if (user.id != undefined && user.id == gaia.id) {
          const background = await Jimp.read(`./img/gaia.png`);
          const attachment = new Discord.Attachment(await background.getBufferAsync(Jimp.MIME_PNG), `gaia.png`);
          message.channel.send(attachment);
          
          /*
          var squareAvatar = await Jimp.read(gaia.displayAvatarURL)
          squareAvatar     = squareAvatar.resize(128, 128);

          var originalBackground = await Jimp.read(`./img/gaia.png`)
          originalBackground     = originalBackground.resize(850, 250);
          originalBackground     = originalBackground.print(sans_thirty_two_black, 230, 85, "Gaia#3223")
          originalBackground     = originalBackground.print(sans_thirty_two_black, 230, 135, (`Birthday: 11/10/2019`))
        
          Promise.all([squareAvatar, mask, originalBackground]).then(async function(images) {
            var squareAvatar = images[0];
            var mask         = images[1];
            var background   = images[2];

            const masked     = squareAvatar.mask(mask, 0, 0);
            background       = background.composite(masked, 61, 61);

            background.write("gaia.png")
            const attachment = new Discord.Attachment(await background.getBufferAsync(Jimp.MIME_PNG), `gaia.png`);
            message.channel.send(attachment);
          });
          */
        };
      };
  };
};

