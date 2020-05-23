const EventEmitter = require('eventemitter3');
const { getBot, getUser, getVotes, updateStats, hasVoted } = require('./functions');

/**
 * @property {String} token GBL API Token
 * @property {Object} options Current options
 */
class GBLAPI extends EventEmitter {
    /**
     * Main Class
     * @param {String} id Client ID
     * @param {String} token GlennBotList Client Token
     * @param {Boolean} logs Automatic Logging
     * @param {Object} options Client Options
     */
    constructor(id, token, logs, options) {
        if (!id) throw new TypeError('Missing Client ID');
        if (!token) throw new TypeError('Missing GBL Token');
        if (!logs && logs !== false && logs !== true) throw new TypeError('Logs boolean is not set');
        if (options) {
            if (options.webhookAuth || !options == false || !options) {
                if (options.webhookAuth) {
                    options = options;
                }
                logs = true;
            }
        }
        super();
        this._id = id;
        this._token = token;
        this._logs = logs;
        this._options = options;
        if (options) {
            if (!options.webhookPort) options.webhookPort = 3001;
            if (!options.webhookPath) options.webhookPath = '/GBLWebhook';
            if (options.webhookAuth) {
                const GBLWebhook = require('./webhook');
                this.webhook = new GBLWebhook(options.webhookPort, options.webhookPath, options.webhookAuth);
            } else {
                throw new TypeError("You must provide webhook auth in both the webhook constructor and website!");
            }
        }
    }

    get version() {
        return require('../package.json').version;
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    get logs() {
        return !!this._logs;
    }

    get options() {
        return this._options;
    }

    /**
     * Get Bot Stats
     * @param {String} id The Client ID of the bot to gain stats from
     */
    async getBot(id = this.id) {
        if (!id) throw new TypeError('Missing Client ID');
        return getBot(id);
    }

    /**
     * Get User Stats
     * @param {String} id The Client ID of the user to gain stats from
     */
    async getUser(id = this.id) {
        if (!id) throw new TypeError('Missing User ID');
        return getUser(id);
    }

    /**
     * Get Votes From A Bot
     * @param {String} id This Client ID of the bot to gain votes from
     * @param {token} auth The GBL Authentication Token of the bot if needed
     */
    async getVotes(id = this.id, auth = this.token) {
        if (this.logs) console.log('[GlennBotList](Client#getVotes) This function may be buggy.');
        if (!id) throw new TypeError('Missing Client ID');
        if (!auth) throw new TypeError('Missing Authentication Token');
        return getVotes(id, auth);
    }

    /**
     * Post Server And Stats Count
     * @param {Number} serverCount The number of servers your bot is in
     * @param {Number} shardCount The number of shards your bot has
     * @param {Boolean} logs Logs boolean
     * @param {String} id The Client ID of what is posting stats, if needed
     * @param {token} auth The token useed to post stats, if needed
     */
    async updateStats(serverCount = 0, shardCount = 0, id = this.id, auth = this.token, logs = this.logs) {
        if (this.logs) console.log(`[GlennBotList] Posting ${serverCount} servers and ${shardCount} shards to GlennBotList...`);
        return updateStats(serverCount, shardCount, id, auth, logs);
    }

    /**
     * If User Has Voted
     * @param {String} userid The ID of the user to see if they have voted
     * @param {String} clientid The Client ID of the bot
     * @param {token} auth The token used to gain the votes, if needed
     * @returns {Boolean}
     * @example
     * <GBL>.hasVoted('414713250832449536')
     *      .then(data => {
     *          if (data) console.log('User has voted!');
     *          else console.log("User hasn't voted!");
     *      }).catch(console.error);
     */
    async hasVoted(userid, clientid = this.id, auth = this.token) {
        if (!userid) throw new TypeError('Missing User ID');
        if (!clientid) throw new TypeError('Missing Client ID');
        if (!auth) throw new TypeError('No valid auth found');
        return hasVoted(userid, clientid, auth);
    }
}

module.exports = GBLAPI;