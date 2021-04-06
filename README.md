# GBLAPI.js 
## - The official JS API Wrapper for the GBL API

# About
**GBL IS NO LONGER ONLINE, SO API MIGHT NOT WORK**
This is the **official** api wrapper for GlennBotList.xyz written in JS, and published to NPMjs.
It uses EventEmitter3, Express and node-fetch to interact with our api.

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
const Glenn = new GBL(bot.user.id, 'XA-a2ee0f0215204efaaa987bda2c16e4ae', false); // Use your bot's user id and GBL Auth Token

bot.on('guildCreate', async (guild) => {
    console.log('New guild joined!');
    Glenn.updateStats(bot.guilds.cache.size);
});

bot.login('your discord bot token');
```

# Example usage with an interval
```js
const Discord = require('discord.js');
const bot = new Discord.Client();

const GBL = require('gblapi.js');
const Glenn = new GBL(bot.user.id, 'XA-a2ee0f0215204efaaa987bda2c16e4ae', false); // Use your bot's user id and GBL Auth Token

setInterval(() => {
    Glenn.updateStats(bot.guilds.cache.size);
}, 15 * 60000) // Sends stats every 15 minutes

bot.login('your discord bot token');
```
# Other
```js
Glenn.getBot().then((d) => console.log(d));
Glenn.getUser().then((d) => console.log(d));
Glenn.hasVoted().then((d) => console.log(d));
Glenn.getVotes().then((d) => console.log(d));
```

# Webhook Information
To enable the webhook listener, you have to add some information to the Glenn constructor!
```js
const Glenn = new GBL(bot.user.id, 'XA-a2ee0f0215204efaaa987bda2c16e4ae', false, { webhookPort: 3001, webhookPath: "/GBLWebhook", webhookAuth: "Really Secure Password" }); // Use our bot's user id and GBL Auth Token, create an express server on port 3001 with the path of /GBLWebhook
```

```js
Glenn.webhook.on("vote", vote => console.log(vote)) // Will send you the user that voted when the vote is recived.
Glenn.webhook.on("ready", console.log) // Will console log when the webhook is online and ready to use!
Glenn.webhook.on("error", console.log) // will console log when an error was encounted in the code/requests.
```

# Authors
> Made by `DieselJS#1689` and `ERIK#1001`
> 
> Wiki by `Condingpro#0001`

# Documentation
> Our wiki is edit and maintained by `Codingpro#0001`.
> You can read our documentation [here](https://glennbotlist.xyz/api/docs).

# Help
> Join our [Discord Server](https://glennbotlist.xyz/discord) for help on this module.
