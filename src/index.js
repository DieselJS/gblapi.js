const EventEmitter = require('eventemitter3');
const getBot = require('./functions/getBot');
const getUser = require('./functions/getUser');
const updateStats = require('./functions/updateStats');
const hasVoted = require('./functions/hasVoted');
const getVotes = require('./functions/getVotes');

class GBLAPI extends EventEmitter {
    /**
     * Main Class
     * @param {string} id Client ID
     * @param {string} token GlennBotList Client Token
     * @param {boolean} logs Automatic logs?
     * @param {object} options Client Options
     */
    constructor(id, token, logs, options) {
        if (!id) throw new TypeError("Missing Client ID");
        if (!token) throw new TypeError("Missing Token");
        if (logs) {
            if (logs.webhookPort || !logs == false || !logs) {
                if (logs.webhookPort) {
                    options = logs;
                }
                logs = true;
            }
        }
        super();
        this._id = id;
        this._token = token;
        this._logging = logs;
        this._options = options;
        if (options) {
            if (!options.webhookPort) options.webhookPort = 3001;
            if (!options.webhookPath) options.webhookPath = "/GBLWebhook";

            if (options.webhookAuth) {
                const GBLWebhook = require('./webhook');
                this.webhook = new GBLWebhook(options.webhookPort, options.webhookPath, options.webhookAuth);
            }
        }
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    get logging() {
        return !!this._logging;
    }

    get options() {
        return this._options;
    }

    /**
     * Get bot stats
     * @param {string} [id] The ID of the bot to gain stats from.
     * @returns {Promise<{}>}
     */
    async getBot(id = this.id) {
        if (!id) throw new TypeError("Missing Bot ID");
        return getBot(id);
    }

    /**
     * Get user stats
     * @param {string} [id] The ID of the user to gain stats from.
     * @returns {Promise<{}>}
     */
    async getUser(id = this.id) {
        if (!id) throw new TypeError("Missing User ID");
        return getUser(id);
    }

    /**
     * Get votes of a bot
     * @param {string} [id] The ID of the bot to gain votes from.
     * @param {token} [auth] The token used to gain the votes, if needed. The token used in the constructor will most likely work.
     * @returns {Promise<{}>}
     */
    async getVotes(id = this.id) {
        console.log("[GlennBotList](Client#getVotes) This function has not been completed and maybe buggy.")
        if (!id) throw new TypeError("Missing Bot ID");
        if (!auth) throw new TypeError("Missing Authentication Token");
        return getVotes(id, auth);
    }

    /**
     * Post server count
     * @param {number} serverCount The number of servers your bot is in
     * @param {number} shardCount The number of shards your bot has
     * @param {string} [id] The ID to post the stats to, if changed
     * @param {token} [auth] The token used to post the stats, if needed
     * @returns {Promise<{ message: string, success: boolean }>}
     */
    async updateStats(serverCount = 0, shardCount = 0, id = this.id, auth = this.token) {
        if (this._logging === true) {
            console.log(`[GlennBotList] Posting Stats...`);
        }
        return updateStats(serverCount, shardCount, id, auth);
    }

    /**
     * If user has voted
     * @param {string} [uid] The ID of the user to see if they voted.
     * @param {string} [id] The ID of the bot to gain stats from.
     * @returns {Boolean}
     * @example
     * Glenn.hasVoted('414713250832449536')
     *   .then(d => {
     *     if (d) console.log("User has voted!")
     *     else console.log("User has not voted.")
     *   }).catch(console.error);
     */
    async hasVoted(uid, id = this.id) {
        if (!uid) throw new TypeError("Missing User ID");
        if (!id) {
            if (!this._id) throw new TypeError("Missing Bot ID");
        }
        return hasVoted(uid, id)
    }
}

module.exports = GBLAPI;

/**
 * @prop {string} token The current API token
 * @prop {object} options The options for the current instance
 */