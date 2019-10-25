# GBLAPI.js - The official

# About
This is the **official** api wrapper for GlennBotList.xyz written in JS, and published to NPMjs

# Installation
To install **gblapi.js** run this command in a terminal from your bot folder:

> Install gblapi.js:
>
>```
>npm install gblapi.js
>```

# Example Usage

```js
const Discord = require('discord.js');
const bot = new Discord.Client();

const GBL = require('gblapi.js');
const Glenn = new GBL(bot.user.id, 'XA-a2ee0f0215204efaaa987bda2c16e4ae'); // Use our bot's user id and GBL Auth Token

bot.on('guildAdd', async (guild) => {
    console.log('New guild joined!');
    Glenn.updateStats(bot.guilds.size);
});

bot.login('your discord bot token');
```
# Other
```js
Glenn.getBot().then((d) => console.log(d));
Glenn.getUser().then((d) => console.log(d));
Glenn.getBotVotes().then((d) => console.log(d));
```

# Author
> Made by `DieselJS#1689` for [Glenn Bot List](https://glennbotlist.xyz)

# Documentation
> We have a Wiki, it is pretty bad, figure it out yourself until a better one is made :)

# Help
> Join our [Discord Server](https://glennbotlist.xyz/discord) for help on this module.